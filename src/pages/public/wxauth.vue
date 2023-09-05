<template>
  <view>
    <view>
      <view>欢迎使用xxx</view>
      <view>授权登录</view>
    </view>

    <view>
      <u-image style="margin: auto" src="@/static/images/wechat_icon.png" mode="widthFix" width="372" />
    </view>

    <view>
      <view>为提供优质服务，xxx需要获取你的以下信息：</view>
      <view>你的公开信息（头像、昵称等）</view>
    </view>

    <view>
      <u-button
        type="primary"
        shape="circle"
        :custom-style="{ height: '88rpx', fontSize: '32' }"
        hover-class="none"
        open-type="getPhoneNumber"
        @getphonenumber="getphonenumberWx"
        >授权登录xxx</u-button
      >
    </view>
  </view>
</template>

<script>
  //   import { wxMiniAppCode2OpenId } from '@/api/user'
  //   import { objToUrl, urlToToObj } from '@/config/urlUtils'
  export default {
    name: 'wxAuthPage',
    data() {
      return {
        wxCode: null,
        openId: null
      }
    },
    onLoad() {},
    created() {
      // #ifdef MP-WEIXIN
      this.getWxCode()
      // #endif
    },
    methods: {
      // #ifdef MP-WEIXIN
      getWxCode() {
        uni.login({
          provider: 'weixin',
          success: (loginRes) => {
            this.wxCode = loginRes.code
          }
        })
      },
      // #endif
      // 授权
      getphonenumberWx(loginInfo) {
      }
    }
  }
</script>

<style lang="scss" scoped>
  page {
    background: #ffffff;
    text-align: center;
  }
  .list-item {
    background: #ffffff;
    margin: 20rpx;
    padding: 26rpx 22rpx;
    border-radius: 20rpx;
  }
  // 提示确认弹框
  .slot-content {
    text-align: center;
    font-size: 32rpx;
    font-family: Hiragino Sans GB-W3, Hiragino Sans GB;
    font-weight: normal;
    color: rgba(51, 51, 51, 0.3);
    padding: 50rpx;
    line-height: 60rpx;
  }
</style>
