<template>
  <view>
    <u-button @click="doRouter('/pages/test/upload')"> 上传图片</u-button>
    <u-button @click="doRouter('/pages/test/mock')"> mock </u-button>
    <u-button @click="doRouter('/pages/test/canvasImg')"> canvasImg </u-button>
    <u-button @click="toPdf"> pdf预览</u-button>
    <u-button @click="toWebView()"> webview</u-button>
    <u-button @click="jumpToSwitchTab('/pages/index/home')"> home</u-button>
    <view>
      <view>i18n</view>
      <u-button @click="switchLang" :throttle-time="0">切换语言</u-button>
      {{ $t('common.intro') }}
    </view>
    <view>登录界面</view>
    <u-button @click="doRouter('/pages/public/login')"> 登录</u-button>
    <u-button @click="doRouter('/pages/public/wxauth')"> 微信授权</u-button>
    <view>
      <view>uview演示</view>
      <u-rate v-model="value" :count="count" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TestPage',
    data() {
      return {
        count: 4,
        value: 2
      }
    },
    created() {
      console.log('home create', this.vuex_user, this.vuex_wang)
      this.$u.vuex('vuex_user', '21')
      this.$u.vuex('vuex_wang', '2')
      console.log('home set', this.vuex_user, this.vuex_wang)
    },
    onShow() {},
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
      jumpToSwitchTab(url) {
        this.$Router.pushTab({ path: url, query: { name: 'wang' } })
      },
      /**
       * 跳转webview
       */
      toWebView() {
        this.$Router.push({
          path: '/pages/public/webview',
          query: { url: 'https://www.baidu.com', backUrl: '/pages/index/home', backType: 'switchTab' }
        })
      },
      /**
       * 预览pdf
       */
      toPdf() {
        this.$Router.push({
          path: '/pages/public/pdf',
          query: { link: 'http://42.193.105.146:9000/nt1/%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf' }
        })
      }
    }
  }
</script>

<style scoped></style>
