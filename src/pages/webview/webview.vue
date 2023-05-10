<template>
  <view>
    <web-view :src="url" />
  </view>
</template>

<script>
  export default {
    name: 'WebView',
    data() {
      return {
        url: '',
        backUrl: '',
        type: ''
      }
    },
    onLoad() {
      // type为navigateTo，redirectTo，switchTab，reLaunch时为必填
      this.url = this.$Route.query.url
      this.backUrl = this.$Route.query.backUrl
      this.backType = this.$Route.query.backType

      this.initPageNum = 0
      // #ifdef H5
      this.initPageNum = window.history.length
      // #endif
    },
    methods: {
      back() {
        // router.push() 等同于 uni.navigateTo() 该方法的参数可以是一个字符串路径，或者一个描述地址的对象
        // router.replace() 等同于 uni.redirectTo() 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
        // router.replaceAll() 等同于 uni.reLaunch() 跟 router.replace 很像，唯一的不同就是，它不会向 history 添加新记录，而是将所有的页面都关掉，打开一个新的页面。
        // router.pushTab() 等同于 uni.switchTab() 跟 router.push 很像，打开 uni-app 自带的tab 菜单
        console.log(this.backUrl, this.backType)
        if (this.backUrl) {
          if (this.backType === 'switchTab') {
            this.$Router.pushTab({ path: this.backUrl, query: { name: 'wang' } })
          } else {
            this.$Router.push({ path: this.backUrl, query: { name: 'wang' } })
          }
        } else {
          // let currentPageNum = 0
          // // #ifdef H5
          // currentPageNum = window.history.length
          // // #endif
          // uni.navigateBack({
          //   delta: currentPageNum - this.initPageNum + 1
          // })
        }
      }
    },
    onUnload() {
      //#ifdef MP-WEIXIN
      this.back()
      //#endif
    }
  }
</script>

<style></style>
