<template>
  <view>
    test download file and upload file to server
    <u-upload :action="action" :file-list="fileList"></u-upload>
  </view>
</template>

<script>
  export default {
    name: 'UploadFile',
    data() {
      return {
        files: [],
        tmpFiles: [],
        // 演示地址，请勿直接使用
        action: 'http://www.example.com/upload',
        fileList: []
      }
    },
    mounted() {
      // this.downloadFile()
    },
    methods: {
      downloadFile() {
        uni.showLoading({
          title: '加载图片...',
          mask: true
        })
        this.files.forEach((file) => {
          wx.downloadFile({
            url: file, // 仅为示例，并非真实的资源
            success: (res) => {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                this.tmpFiles.push(res.tempFilePath)
              }
            }
          })
        })
        const lenInterval = setInterval(() => {
          if (this.tmpFiles.length >= 4) {
            console.log(this.tmpFiles.length)
            uni.hideLoading()
            clearInterval(lenInterval)
            this.uploadFile()
          }
        }, 1000)
      },
      uploadFile() {
        console.log('开始上传图片')
        const _files = []
        this.tmpFiles.forEach((file, index) => {
          _files.push({ name: `file${index}`, uri: file })
        })
        console.log(_files)
        // join the files tmpFiles
        uni.uploadFile({
          url: process.env.VUE_APP_BASE_API + '/upload',
          files: _files,
          success: (suc) => {
            console.log(suc)
          }
        })
      }
    }
  }
</script>

<style scoped></style>
