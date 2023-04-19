/**
 *获取本地的文件路径
 * @param path 文件路径
 * @returns {*|string}
 */
export const getLocalFilePath = (path) => {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path
  }
  if (path.indexOf('file://') === 0) {
    return path
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path
  }
  if (path.indexOf('/') === 0) {
    const localFilePath = plus.io.convertAbsoluteFileSystem(path)
    if (localFilePath !== path) {
      return localFilePath
    } else {
      path = path.substr(1)
    }
  }
  return '_www/' + path
}

/**
 * 文件路径转base64
 * @param path 文件路径
 * @returns {Promise<unknown>}
 */
export const pathToBase64 = (path) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'object' && 'document' in window) {
      let canvas = document.createElement('canvas')
      let c2x = canvas.getContext('2d')
      let img = new Image()
      img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        c2x.drawImage(img, 0, 0)
        resolve(canvas.toDataURL())
      }
      img.onerror = reject
      img.src = path
      return
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(
        getLocalFilePath(path),
        function (entry) {
          entry.file(
            function (file) {
              let fileReader = new plus.io.FileReader()
              fileReader.onload = function (data) {
                resolve(data.target.result)
              }
              fileReader.onerror = function (error) {
                reject(error)
              }
              fileReader.readAsDataURL(file)
            },
            function (error) {
              reject(error)
            }
          )
        },
        function (error) {
          reject(error)
        }
      )
      return
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function (res) {
          resolve('data:image/png;base64,' + res.data)
        },
        fail: function (error) {
          reject(error)
        }
      })
      return
    }
    reject(new Error('not support'))
  })
}

/**
 * base64保存文件到本地
 * @param base64 base64字符串
 * @returns {Promise<unknown>}
 */
export const base64ToPath = (base64) => {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',')
      let type = base64[0].match(/:(.*?);/)[1]
      let str = atob(base64[1])
      let n = str.length
      let array = new Uint8Array(n)
      while (n--) {
        array[n] = str.charCodeAt(n)
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })))
    }
    let extName = base64.match(/data:\S+\/(\S+);/)
    if (extName) {
      extName = extName[1]
    } else {
      reject(new Error('base64 error'))
    }
    let fileName = Date.now() + '.' + extName
    if (typeof plus === 'object') {
      let bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
      bitmap.loadBase64Data(
        base64,
        function () {
          let filePath = '_doc/uniapp_temp/' + fileName
          bitmap.save(
            filePath,
            {},
            function () {
              bitmap.clear()
              resolve(filePath)
            },
            function (error) {
              bitmap.clear()
              reject(error)
            }
          )
        },
        function (error) {
          bitmap.clear()
          reject(error)
        }
      )
      return
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      let filePath = wx.env.USER_DATA_PATH + '/' + fileName
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function () {
          resolve(filePath)
        },
        fail: function (error) {
          reject(error)
        }
      })
      return
    }
    reject(new Error('not support'))
  })
}
