<template>
  <view>
    <!-- <view class="txt">8-16位，至少包含数字、字母、特殊字符中的两类</view> -->

    <view class="form-warp">
      <u-form
        ref="uForm"
        :model="form"
      >
        <u-form-item
          :label-style="{color: '#333333',fontWeight:'bold', fontSize: '28rpx',height:'30rpx'}"
          label-width="155"
          label="手机号"
          prop="phone"
        >
          <u-input
            v-model="form.phone"
            :border="false"
            placeholder="请输入手机号"
          />
        </u-form-item>
        <u-form-item
          :label-style="{color: '#333333',fontWeight:'bold', fontSize: '28rpx',height:'30rpx'}"
          label-width="155"
          label="图形验证码"
          prop="captcha"
        >
          <u-input
            v-model="form.captcha"
            :border="false"
            placeholder="请输入图形验证码"
          />
          <u-image
            slot="right"
            class="captchaImg"
            width="240rpx"
            height="72rpx"
            :fade="false"
            :src="form.imgCaptcha.img"
            @click="getImgCaptcha()"
          />
        </u-form-item>
        <u-form-item
          :label-style="{color: '#333333',fontWeight:'bold', fontSize: '28rpx',height:'30rpx'}"
          label-width="155"
          label="短信验证码"
          prop="yzm"
        >
          <u-input
            v-model="form.yzm"
            :border="false"
            placeholder="请输入短信验证码"
          />
          <u-button
            slot="right"
            class="code-btn"
            :disabled="form.btnBool"
            type="default"
            :hair-line="false"
            :custom-style="{background:'#FFFFFF',color: '#FF4848',fontSize: '28rpx',height:'30rpx',border: 'none',paddingRight:'0rpx'}"
            hover-class="background:#fff"
            @click="getyzm"
          >
            {{ form.codeText }}
          </u-button>
        </u-form-item>
        <u-form-item
          :label-style="{color: '#333333',fontWeight:'bold', fontSize: '28rpx',height:'30rpx'}"
          label-width="155"
          label="新密码"
          prop="newpassword"
        >
          <u-input
            v-model="form.newpassword"
            :border="false"
            type="password"
            placeholder="请输入新密码"
          />
        </u-form-item>
        <u-form-item
          :label-style="{color: '#333333',fontWeight:'bold', fontSize: '28rpx',height:'30rpx'}"
          label-width="155"
          label="确认密码"
          prop="confirmpassword"
        >
          <u-input
            v-model="form.confirmpassword"
            :border="false"
            type="password"
            placeholder="请输入确认密码"
          />
        </u-form-item>
      </u-form>
    </view>

    <view class="button">
      <u-button
        open-type="getPhoneNumber"
        type="error"
        shape="circle"
        :custom-style="{background: '#C72323'}"
        hover-class="none"
        @click="complete"
      >
        完成
      </u-button>
    </view>
    <!-- 提示弹窗 -->
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import {
  phoneSms, imgCaptcha, forgotPwd
} from '@/api/user'
import { encrypt } from '@/common/rsaEncrypt'

export default {
  data() {
    return {
      form: {
        phone: '',

        yzm: '',
        codeText: '获取验证码',
        btnBool: false,

        newpassword: '',
        confirmpassword: '',

        // 图形验证码
        captcha: null,
        imgCaptcha: {}
      }
    }
  },
  created() {
    this.getImgCaptcha()
  },
  methods: {
    // 验证码
    getyzm() {
      if (!this.form.phone) {
        this.$refs.uToast.show({
          title: '请输入手机号！',
          type: 'warning'
        })
        return
      }
      const strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (!strTemp.test(this.form.phone)) {
        this.$refs.uToast.show({
          title: '请输入正确手机号！',
          type: 'warning'
        })
        return
      }
      if (!this.form.captcha) {
        this.$refs.uToast.show({
          title: '请输入图形验证码！',
          type: 'warning'
        })
        return
      }
      const userYzm = {
        phone: this.form.phone,
        code: this.form.captcha,
        uuid: this.form.imgCaptcha.uuid
      }
      phoneSms(this, userYzm).then((res) => {
        if (res.code === 'E0001') {
          this.setDaojishi()
        } else if (res.code === 'E0002') {
          this.$refs.uToast.show({
            title: '操作频繁,请稍后再试',
            type: 'warning'
          })
          this.getImgCaptcha()
        } else {
          this.$u.toast(res.message)
          this.getImgCaptcha()
        }
      }).catch((err) => {
        console.error(err)
        this.$u.toast(err.message)
      })
    },
    // 验证码倒计时
    setDaojishi() {
      let i = 59
      this.form.codeText = '60s后重新获取'
      this.form.btnBool = true
      const timer = setInterval(() => {
        this.form.btnBool = true
        this.form.codeText = `${i}s后重新获取`
        i--
        if (i < 0) {
          this.form.btnBool = false
          this.form.codeText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
    // 获取图片验证码
    getImgCaptcha() {
      imgCaptcha(this).then((e) => {
        this.form.imgCaptcha = e.data
      })
    },
    // 完成提交
    complete() {
      if (!this.form.phone) {
        this.$refs.uToast.show({
          title: '请输入手机号！',
          type: 'warning'
        })
        return
      }
      const strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (!strTemp.test(this.form.phone)) {
        this.$refs.uToast.show({
          title: '请输入正确手机号',
          type: 'warning'
        })
        return
      }
      if (!this.form.captcha) {
        this.$refs.uToast.show({
          title: '请输入图形验证码！',
          type: 'warning'
        })
        return
      }
      if (!this.form.yzm) {
        this.$refs.uToast.show({
          title: '请输入短信验证码！',
          type: 'warning'
        })
        return
      }
      if (!this.form.newpassword) {
        this.$refs.uToast.show({
          title: '请输入新密码！',
          type: 'warning'
        })
        return
      }
      if (!this.form.confirmpassword) {
        this.$refs.uToast.show({
          title: '请输入确认密码！',
          type: 'warning'
        })
        return
      }
      if (this.form.newpassword !== this.form.confirmpassword) {
        this.$refs.uToast.show({
          title: '两次输入密码不一致！',
          type: 'warning'
        })
        return
      }
      this.submitResFun()
    },

    submitResFun() {
      // const phoneYzm = {
      //   phone: this.form.phone,
      //   smsCode: this.form.yzm,
      //   code: this.form.captcha,
      //   uuid: this.form.imgCaptcha.uuid
      // }
      const passParams = {
        phone: this.form.phone,
        smsCode: this.form.yzm,
        newPassword: encrypt(this.form.newpassword),
        confirmPassword: encrypt(this.form.confirmpassword)
      }
      forgotPwd(this, passParams).then((e) => {
        this.$u.toast(e.message)
        if (e.code === '00000') {
          setTimeout(() => {
            uni.navigateBack()// 返回上一页
          }, 800)
        }
      }).catch((err) => {
        console.error(err)
        this.$u.toast(err.message)
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #F8F8F8;
}

.txt {
  font-size: 20rpx;
  color: #999999;
  text-align: center;
  padding: 30rpx 0;
}

.form-warp {
  background-color: #FFFFFF;
  box-shadow: 0rpx 3rpx 6rpx #8d8d8d33;
  border-radius: 20rpx;
  padding: 4rpx 30rpx 0rpx;
  margin: 30rpx 32rpx;
}

.button {
  width: 80%;
  margin: 380rpx auto;
}

::v-deep .u-toast {
  padding: 9px 12px;
}
</style>
