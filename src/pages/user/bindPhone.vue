<template>
  <view>
    <z-nav-bar title="绑定手机号" />
    <!-- 公共组件-每个页面必须引入 -->
    <public-module />
    <view class="bindAccountBox">
      <image :src="logoUrl" />
      <view>
        <image src="../../static/images/bindingIcon.png" />
      </view>
      <image src="../../static/images/WeChatIcon.png" />
    </view>
    <view class="inputItem">
      <view class="title">
        *手机号
      </view>
      <view class="info">
        <input
          v-model="phone"
          type="number"
          placeholder="请输入"
        >
      </view>
    </view>
    <view class="inputItem">
      <view class="title">
        *验证码
      </view>
      <view class="info">
        <input
          v-model="code"
          type="number"
          placeholder="请输入"
        >
        <button @click="getCode">
          {{ codeText }}
        </button>
      </view>
    </view>
    <view class="registeredBut bindAccountBut">
      <button @click="onSubmit">
        立即绑定
      </button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import socket from '@/config/socket'
// #ifdef H5
import { publicShare } from '@/config/utils'

let clear
// #endif
export default {
  data() {
    return {
      logoUrl: '',
      readonly: false,
      codeText: '获取验证码',
      phone: '',
      code: ''
    }
  },
  // 第一次加载
  onLoad(e) {
    this.logoUrl = this.$base.logoUrl
  },
  computed: {
    ...mapState(['userInfo', 'chatScenesInfo'])
  },
  // 页面显示
  onShow() {
  },
  // 方法
  methods: {
    ...mapMutations(['setUserInfo']),
    // 验证码按钮文字状态
    getCodeState() {
      const _this = this
      this.readonly = true
      this.codeText = '60S后重新获取'
      let s = 60
      clear = setInterval(() => {
        s--
        _this.codeText = `${s}S后重新获取`
        if (s <= 0) {
          clearInterval(clear)
          _this.codeText = '获取验证码'
          _this.readonly = false
        }
      }, 1000)
    },
    // 获取验证码
    getCode() {
      if (this.readonly) {
        uni.showToast({
          title: '验证码已发送',
          icon: 'none'
        })
        return
      }
      if (this.phone === '') {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (!this.$base.phoneRegular.test(this.phone)) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        return
      }
      this.$http
        .post('api/open/v1/send_sms', {
          phone: this.phone,
          type: 3104
        })
        .then((res) => {
          console.log(res)
          this.getCodeState()
        })
    },
    // 账号绑定
    onSubmit() {
      if (this.phone === '') {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (!this.$base.phoneRegular.test(this.phone)) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        return
      }
      if (this.code === '') {
        uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
        return
      }
      if (!/^[0-9]{6}$/.test(this.code)) {
        uni.showToast({
          title: '验证码必须是6位数',
          icon: 'none'
        })
        return
      }
      if (!(this.userInfo.wxSmallOpenId || this.userInfo.openId || this.userInfo.wxPublicOpenId)) {
        uni.showToast({
          title: '数据丢失',
          icon: 'none'
        })
        return
      }
      const httpData = {
        openId: this.userInfo.openId || this.userInfo.wxSmallOpenId || this.userInfo.wxPublicOpenId,
        phone: this.phone,
        code: this.code
      }
      // #ifdef MP-WEIXIN
      httpData.type = 1201
      // #endif
      // #ifdef H5
      httpData.type = 1301
      // #endif
      // #ifdef APP-PLUS
      httpData.type = 1101
      // #endif
      if (this.userInfo.unionid || this.userInfo.wxUnionid) {
        httpData.unionid = this.userInfo.unionid || this.userInfo.wxUnionid
      }
      // #ifdef H5
      const recommendCode = uni.getStorageSync('recommendCode')
      if (recommendCode) {
        httpData.recommendCode = recommendCode
      }
      // #endif
      // #ifndef H5
      if (this.chatScenesInfo.recommendCode) {
        httpData.recommendCode = this.chatScenesInfo.recommendCode
      }
      // #endif
      this.$http
        .post('api/open/v1/third_bind', httpData)
        .then((res) => {
          this.setUserInfo(res)
          // #ifdef H5
          publicShare()
          // #endif
          socket.init()
          uni.showModal({
            title: '提示',
            content: '账号绑定成功！',
            showCancel: false,
            success: (res) => {
              uni.navigateBack()
            }
          })
        })
    }
  },
  // 页面隐藏
  onHide() {
  },
  // 页面卸载
  onUnload() {
  },
  // 页面下来刷新
  onPullDownRefresh() {
  },
  // 页面上拉触底
  onReachBottom() {
  },
  // 用户点击分享
  onShareAppMessage(e) {
    return this.wxShare()
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.bindAccountBox {
  height: 283rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bindAccountBox > image {
  width: 95rpx;
  height: 95rpx;
  border-radius: 15rpx;
}

.bindAccountBox > view {
  width: 95rpx;
  height: 95rpx;
  padding: 0rpx 20rpx;
  display: flex;
  align-items: center;
}

.bindAccountBox > view image {
  width: 100%;
  height: 40rpx;
}

.bindAccountBut {
  margin-top: 60rpx;
}

.registeredBut {
  margin-bottom: 30rpx;
  padding: 0rpx 20rpx;
}

.registeredBut button {
  font-size: 36rpx;
  border-radius: 3rpx;
  text-align: center;
  line-height: 90rpx;
  height: 90rpx;
  background-color: $themeColor;
  color: #fff;
}

.inputItem {
  background-color: #fff;
  display: flex;
  margin-top: 12rpx;
  padding: 0 25rpx;
}

.inputItem .title {
  min-width: 190rpx;
  height: 100rpx;
  line-height: 100rpx;
  flex-shrink: 0;
  font-size: 30rpx;
  white-space: nowrap;
}

.inputItem .info {
  flex: 1;
  display: flex;
  align-items: center;
  color: #999;
}

.inputItem .info input {
  height: 100rpx;
  line-height: 100rpx;
  font-size: 30rpx;
  width: 100%;
}

.inputItem .info button {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  flex-shrink: 0;
  padding: 0 15rpx;
  border: 1rpx solid $themeColor;
  background-color: #fff;
  color: $themeColor;
}
</style>
