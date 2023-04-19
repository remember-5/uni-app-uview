<template>
  <view>
    <view>
      <view>欢迎使用翼企购</view>
      <view>授权登录</view>
    </view>

    <view>
      <u-image style="margin: auto" src="@/static/images/WeChatIcon.png" mode="widthFix" width="372" />
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
    name: 'wxauthPage',
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
        // wxMiniAppCode2OpenId(this, { wxCode: this.wxCode }).then((e) => {
        //   console.log(e)
        //   if (e.code === '00000') {
        //     this.openId = e.data
        //     this.$u.toast('授权成功！')
        //     setTimeout(() => {
        //       if (this.vuex_login_page_back_url) {
        //         // 存在back_url
        //         switch (
        //           this.vuex_login_page_back_biz_type // 判断业务场景
        //         ) {
        //           case 'A01': // Webview H5详情页跳转小程序登录页面
        //             if (this.vuex_login_page_back_is_webview) {
        //               // 是否是webview
        //               const backJson = urlToToObj(this.vuex_login_page_back_url)
        //               backJson['token'] = this.vuex_access_token
        //               const prefixUrl = this.vuex_login_page_back_url.split('?')[0]
        //               const backUrl = objToUrl(backJson, prefixUrl)
        //               this.$u.route({
        //                 url: 'pages/index/webview/index',
        //                 type: this.vuex_login_page_back_is_webview === '' ? 'navigateTo' : this.vuex_login_page_back_is_webview,
        //                 params: {
        //                   url: encodeURIComponent(backUrl),
        //                   backUrl: 'pages/index/login/index'
        //                 }
        //               })
        //             } else {
        //               this.$u.route({
        //                 url: decodeURIComponent(this.vuex_login_page_back_url),
        //                 type: this.vuex_login_page_back_is_webview === '' ? 'navigateTo' : this.vuex_login_page_back_is_webview
        //               })
        //             }
        //             break
        //           default:
        //             uni.switchTab({
        //               url: '/pages/tabbar/index'
        //             })
        //             break
        //         }
        //       } else {
        //         uni.switchTab({
        //           url: '/pages/tabbar/index'
        //         })
        //       }
        //     }, 800)
        //   } else {
        //     this.$u.toast('获取openId失败！')
        //   }
        // })
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
