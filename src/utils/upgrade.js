/**
 * Copyright [2022] [remember5]
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 微信平台需要更新
 */
export const wxUpgrade = () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    console.log(res)
  })

  updateManager.onUpdateReady((res) => {
    console.log(res)
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed((res) => {
    console.log(res)
    // 新的版本下载失败
    uni.showModal({
      title: '提示',
      content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
      confirmText: '知道了'
    })
  })
}

/**
 * 热更
 * @param url wgt地址
 */
export const appUpgrade = (url) => {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url,
      success: (rep) => {
        // 更新即把缓存删除 这样缓存里的版本号才会更新后更新
        this.$u.vuex('vuex_version', '')
        this.$u.vuex('vuex_version_code', '')
        this.$u.vuex('vuex_platform', '')
        console.log('清除')
        if (rep.statusCode === 200) {
          plus.nativeUI.showWaiting('安装更新文件...')
          plus.runtime.install(
            rep.tempFilePath,
            {
              force: true
            },
            () => {
              plus.nativeUI.closeWaiting()
              plus.nativeUI.alert('应用资源更新完成！', () => {
                plus.runtime.restart()
                resolve()
              })
            },
            (e) => {
              plus.nativeUI.closeWaiting()
              plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e.message}`)
              if (e.code === 10) {
                alert('请清除临时目录')
              }
              reject()
            }
          )
        }
      },
      fail: (res1) => {
        console.error(res1)
        plus.nativeUI.alert('下载失败！')
        reject()
      }
    })
  })
}

export const getAppVersion = () => {
  // #ifdef APP-PLUS
  plus.runtime.getProperty(plus.runtime.appid, async (wgtinfo) => {
    this.$u.vuex('vuex_version', wgtinfo.version)
    this.$u.vuex('vuex_version_code', wgtinfo.versionCode)
  })
  // #endif
}
