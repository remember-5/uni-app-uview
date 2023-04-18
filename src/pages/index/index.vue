<template>
  <view>
    <view>其他</view>
    <u-button @click="doRouter('/pages/index/upload')"> 上传图片</u-button>
    <u-button @click="doRouter('/pages/index/mock')"> mock </u-button>
    <u-button @click="toPdf"> pdf预览</u-button>
    <u-button @click="toWebView()"> webview</u-button>
    <view>
      <view>i18n</view>
      <u-button @click="switchLang" :throttle-time="0">切换语言</u-button>
      {{ $t('common.intro') }}
    </view>
    <view>登录界面</view>
    <u-button @click="doRouter('/pages/login/login')"> 登录</u-button>
    <u-button @click="doRouter('/pages/login/wxauth')"> 微信授权</u-button>
    <view>
      <view>uview演示</view>
      <u-rate v-model="value" :count="count" />
    </view>
    <upgrade-popup
      :show="modalShow"
      :update-content="updateContent"
      :after-show="afterShow"
      :close-show="modalCloseShow"
      :percent="percent"
      @close="upgradeClose"
      @updateNow="updateNowBtn"
    ></upgrade-popup>
  </view>
</template>

<script>
  import upgradePopup from '@/components/upgradePopup/modal-img.vue'
  export default {
    name: 'IndexPage',
    components: {
      upgradePopup
    },
    data() {
      return {
        dowAppUrl: '', // 下载地址
        dowAppTask: null, // 下载进度监控用来做 进度展示
        modalShow: true, // 显示新版本升级
        updateContent: '',
        modalCloseShow: false, // 显示关闭按钮
        afterShow: false, // 是否显示升级加载进度条
        percent: 0, // 升级加载进度条-百分比0~100
        appleId: '', // ios app id
        count: 4,
        value: 2
      }
    },
    created() {
      // await this.checkUpdate()
    },
    onShow() {
      // console.log('index create', this.vuex_user, this.vuex_wang)
      // this.$u.vuex('vuex_user', '1')
      // this.$u.vuex('vuex_wang', '1')
      // console.log('index set', this.vuex_user, this.vuex_wang)
    },
    methods: {
      /**
       * 切换中英文
       * @param language
       */
      switchLang() {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
      },
      /**
       * 做路由跳转
       * @param url
       * @param params
       */
      doRouter(url) {
        // 路由跳转
        this.$Router.push({ path: url, query: { name: 'wang' } })
        // 在onLoad中使用this.$Route.query获取参数
      },
      /**
       * 跳转webview
       */
      toWebView() {
        this.$Router.push({ path: '/pages/webview/webview', query: { url: 'https://www.baidu.com' } })
      },
      /**
       * 预览pdf
       */
      toPdf() {
        this.$Router.push({
          path: '/pages/pdf/pdf',
          query: { link: 'http://42.193.105.146:9000/nt1/%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf' }
        })
      },
      upgradeClose() {
        this.modalShow = false
      },
      async checkUpdate() {
        // // todo 版本升级
        // if (this.vuex_version && this.vuex_version_code) {
        //   this.updateApp()
        // }
        await this.updateApp()
      },
      // 新版本升级弹窗-点击马上更新进入加载进度条
      updateNowBtn() {
        this.installApp(this.dowAppUrl)
      },
      // 更新app
      async updateApp() {
        // 请求接口 版本号是x.y.z 打包号是数字递增，打包号变更就热更，版本号变更，就提示去更新apk和应用商店
        // 更新类型 wgt or app
        // wgt 判断 forcibly = 强制更新 (不给关闭的按钮), solicit = 弹窗确认更新, silent = 静默更新
        // url
        // app更新就判断android iOS，android下载新的apk，iOS跳转应用商店
        // 更新说明
        // this.modalShow = true
        // this.dowAppUrl = ''
        // isnew(this).then((res) => {
        //   if (!res.data.isnew) {
        //     this.modalShow = true
        //     this.dowAppUrl = res.data.url
        //   }
        // })
      },
      // 安装app
      installApp(url) {
        if (this.vuex_platform === 'ios') {
          uni.request({
            url: `https://itunes.apple.com/cn/lookup?id=${this.appleId}`,
            success: (e) => {
              console.log(e.data.results[0].version)
              const tiao = `itms-apps://itunes.apple.com/app/${this.appleId}`
              plus.runtime.openURL(tiao)
            },
            fail: (err) => {
              console.log(err)
            },
            complete: () => {}
          })
          return
        }
        // 暂时下载进度 下面是apk的下载
        this.afterShow = true
        const dowAppTask = uni.downloadFile({
          url,
          success: (res1) => {
            if (res1.statusCode === 200) {
              console.log(res1.tempFilePath)
              plus.runtime.openFile(res1.tempFilePath)
            }
          },
          fail: (res1) => {
            console.error(res1)
            plus.nativeUI.alert('下载失败！')
          }
        })
        const that = this
        dowAppTask.onProgressUpdate((res) => {
          that.percent = res.progress
        })
      }
    }
  }
</script>

<style></style>
