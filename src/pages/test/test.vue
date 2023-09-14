<template>
  <view>
    <u-button @click="doRouter('/pages/test/upload')"> {{ $t('test.uploadPage') }} </u-button>
    <u-button @click="doRouter('/pages/test/mock')"> {{ $t('test.mockPage') }} </u-button>
    <u-button @click="doRouter('/pages/test/canvasImg')"> {{ $t('test.canvasPage') }} </u-button>
    <u-button @click="doRouter('/pages/test/echarts')"> {{ $t('test.echartsPage') }} </u-button>
    <u-button @click="toPdf"> {{ $t('test.pdfPage') }}</u-button>
    <u-button @click="toWebView()"> {{ $t('test.webviewPage') }}</u-button>
    <u-button @click="jumpToSwitchTab('/pages/index/home')"> {{ $t('test.homePage') }}</u-button>
    <u-button @click="doRouter('/pages/public/login')"> {{ $t('test.loginPage') }}</u-button>
    <u-button @click="doRouter('/pages/public/wxauth')"> {{ $t('test.authPage') }}</u-button>
    <view>
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
