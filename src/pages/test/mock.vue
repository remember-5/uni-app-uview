<template>
  <view>
    <view>mock的测试页面，请打开控制台查看</view>
    <view>如需要开启，请配置环境变量`VUE_APP_MOCK`</view>
  </view>
</template>

<script>
  import { testMockRequest } from '@/api/user.js'
  export default {
    name: 'MockView',
    data() {
      return {
        mock: false
      }
    },
    created() {
      if (process.env.VUE_APP_MOCK === 'false') {
        this.$u.toast('请开启mock后重试')
        return
      }
      this.testMock()
    },
    methods: {
      async testMock() {
        const result = await testMockRequest()
        console.log(result)
      }
    }
  }
</script>

<style scoped></style>
