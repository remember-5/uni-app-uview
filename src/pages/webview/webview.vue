<template>
  <view>
    <web-view :src="url" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      backUrl: '',
      type: ''
    }
  },
  onLoad(options) {
    // type为navigateTo，redirectTo，switchTab，reLaunch时为必填
    this.url = decodeURIComponent(decodeURIComponent(options.url))
    this.backUrl = decodeURIComponent(options.backUrl)
    this.type = options.type

    this.initPageNum = 0
    // #ifdef H5
    this.initPageNum = window.history.length
    // #endif
  },
  methods: {
    back() {
      let currentPageNum = 0
      // #ifdef H5
      currentPageNum = window.history.length
      // #endif
      uni.navigateBack({
        delta: currentPageNum - this.initPageNum + 1
      })
    }
  }
}
</script>

<style>

</style>
