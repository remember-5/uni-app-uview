<script>
import { getVersion } from '@/api/version'

export default {
  // 此处globalData为了演示其作用，不是uView框架的一部分
  globalData: {
    username: ''
  },
  onLaunch() {
    // 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
    // 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
    // import httpInterceptor from '@/common/http.interceptor.js'
    // Vue.use(httpInterceptor, app)
    // process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
    // #ifdef APP-PLUS
    if (!this.vuex_version || !this.vuex_version_code) {
      plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
        // console.log(wgtinfo)
        // todo 需要在版本或版本号更改时进行重新获取
        this.$u.vuex('vuex_version', wgtinfo.version)
        this.$u.vuex('vuex_version_code', wgtinfo.versionCode)
        this.getVersion()
      })
    } else {
      this.getVersion()
    }
    // #endif
    // #ifdef APP-PLUS || H5
    if (!this.vuex_platform) {
      uni.getSystemInfo({
        success: (info) => {
          this.$u.vuex('vuex_platform', info.platform)
        }
      })
    }
    // #endif
    /**
     * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
     */
    // 判断微信更新
    // #ifdef MP-WEIXIN
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
    // #endif
  },
  methods: {
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
