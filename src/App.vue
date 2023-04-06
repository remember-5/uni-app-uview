<script>
  export default {
    onLaunch() {
      // 判断app和h5平台,保存当前的平台
      // #ifdef APP-PLUS || H5
      const systemInfoSync = uni.getSystemInfoSync()
      this.$u.vuex('vuex_platform', systemInfoSync.platform)
      // #endif

      // 微信更新
      // #ifdef MP-WEIXIN
      this.wxMiniProgramUpgrade()
      // #endif
    },
    onShow() {
      // #ifdef APP-PLUS
      plus.runtime.getProperty(plus.runtime.appid, async (wgtinfo) => {
        this.$u.vuex('vuex_version', wgtinfo.version)
        this.$u.vuex('vuex_version_code', wgtinfo.versionCode)
        await this.checkStats()
        this.getVersion()
      })
      // #endif
    },
    methods: {
      // #ifdef MP-WEIXIN
      /**
       * 微信小程序更新
       */
      wxMiniProgramUpgrade() {
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
      },
      // #endif
      /**
       * 热更
       * @param url wgt地址
       */
      hotUpdate(url) {
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
                  })
                },
                (e) => {
                  plus.nativeUI.closeWaiting()
                  plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e.message}`)
                  if (e.code === 10) {
                    alert('请清除临时目录')
                  }
                }
              )
            }
          },
          fail: (res1) => {
            console.error(res1)
            plus.nativeUI.alert('下载失败！')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import 'uview-ui/index.scss';
</style>
