<script>
import {
  getVersion
} from '@/api/version.js'
// import { mPushInfoDel, mPushInfoPut, mPushInfoDelAll } from '@/api/tags'

export default {
  // 此处globalData为了演示其作用，不是uView框架的一部分
  globalData: {
    username: ''
  },
  onLaunch() {
    // 判断app和h5平台
    // #ifdef APP-PLUS || H5
    const systemInfoSync = uni.getSystemInfoSync()
    this.$u.vuex('vuex_platform', systemInfoSync.platform)
    // #endif

    // 判断微信更新
    // #ifdef MP-WEIXIN
    this.wxMiniProgramUpgrade()
    // #endif
  },
  onShow() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, async(wgtinfo) => {
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
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate);
      })

      updateManager.onUpdateReady((res) => {
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
     * 检测更新状态
     * @returns {Promise<RequestTask>}
     */
    async checkStats() {
      // 判断是否维护
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async(resolve, reject) => {
        console.log('开始checkStats')
        const version = this.vuex_version
        const versionCode = this.vuex_version_code
        let platform = this.vuex_platform
        // #ifdef H5
        platform = 'h5'
        // #endif

        uni.request({
          url: process.env.VUE_APP_STATS_API, // 仅为示例，并非真实接口地址。
          data: {},
          header: {
            version,
            versionCode,
            platform
          },
          success: (res) => {
            console.log('checkStats response ', res)
            if (res.statusCode === 200) {
              const res_data = res.data
              if (res_data.code === '00000') {
                if (res_data.data && res_data.data === true) {
                  // 开始维护
                  console.warn('系统维护中')
                  this.$u.route('pages/index/upgradePage')
                }
                // 不维护
              }
            } else {
              console.warn('系统维护中')
              this.$u.route('pages/index/upgradePage')
            }
            resolve()
          },
          fail: (e) => {
            console.warn('开始维护')
            this.$u.route('pages/index/upgradePage')
          }
        })
      })
    },
    getVersion() {
      getVersion(this).then((res) => {
        res = res.data
        const that = this
        uni.downloadFile({
          url: res[0].url,
          success: (res1) => {
            // 更新即把缓存删除 这样缓存里的版本号才会更新后更新
            that.$u.vuex('vuex_version', '')
            that.$u.vuex('vuex_version_code', '')
            that.$u.vuex('vuex_platform', '')
            console.log('清除')
            if (res1.statusCode === 200) {
              plus.nativeUI.showWaiting('安装更新文件...')
              plus.runtime.install(res1.tempFilePath, {
                force: true
              }, () => {
                plus.nativeUI.closeWaiting()
                plus.nativeUI.alert('应用资源更新完成！', () => {
                  plus.runtime.restart()
                })
              }, (e) => {
                plus.nativeUI.closeWaiting()
                plus.nativeUI.alert(`安装更新文件失败[${e.code}]：${e
                  .message}`)
                if (e.code === 10) {
                  // eslint-disable-next-line
                  alert('请清除临时目录');
                }
              })
            }
          },
          fail: (res1) => {
            plus.nativeUI.alert('下载失败！')
          }
        })
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import './style/common.scss';
</style>
