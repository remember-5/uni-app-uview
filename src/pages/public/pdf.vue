<template>
  <view class="content">
    <web-view :src="url" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // pdf.js的viewer.htm所在路径
        // 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
        viewerUrl: '/hybrid/html/pdf/web/viewer.html',
        // 要访问的pdf的路径
        fileUrl: '',
        // 最终显示在web-view中的路径
        url: ''
      }
    },
    onLoad() {
      const link = decodeURIComponent(this.$Route.query.link)
      console.log(link)
      // h5，使用h5访问的时候记得跨域
      // #ifdef H5
      this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      // #endif

      // 在安卓和ios手机上
      // 判断是手机系统：安卓，使用pdf.js
      // #ifdef APP-PLUS
      if (plus.os.name === 'Android') {
        this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      } else {
        // ios，直接访问pdf所在路径
        // 直接用在iOS15.4.1不生效
        // this.url = encodeURIComponent(link);
        this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      }
      // #endif
    },
    methods: {}
  }
</script>

<style></style>
