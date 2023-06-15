<template>
  <view>
    <view>
      <view class="sjmima-header">
        <view class="title-font">欢迎使用！</view>
      </view>
      <view class="form-warp">
        <u-form ref="uForm" :model="form">
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="180" label="手机号：" prop="name">
            <u-input
              v-model="form.phone"
              placeholder="请输入您的手机号"
              :border="false"
              type="text"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
            />
          </u-form-item>
          <!--          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="130" label="验证码：" prop="code">-->
          <!--            <view style="display: flex">-->
          <!--              <u-input-->
          <!--                v-model="form.captcha"-->
          <!--                placeholder="请输入您的验证码"-->
          <!--                :border="false"-->
          <!--                maxlength="6"-->
          <!--                type="text"-->
          <!--                :custom-style="{ color: '#494949', fontSize: '28rpx' }"-->
          <!--                placeholder-style="color: #B2B2B2; font-size: 28rpx;"-->
          <!--              />-->
          <!--              <u-image class="captchaImg" width="240rpx" height="72rpx" :fade="false" :src="form.imgCaptcha.img" @click="initImgCaptcha()" />-->
          <!--            </view>-->
          <!--          </u-form-item>-->
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="180" label="短信验证码：" prop="code">
            <u-input
              v-model="form.smsCode"
              placeholder="请输入您的验证码"
              :border="false"
              maxlength="6"
              type="text"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
            />
            <u-button
              slot="right"
              class="code-btn"
              :disabled="form.btnBool"
              type="default"
              shape="circle"
              :custom-style="{ background: '#FFFFFF', color: '#3F69FF', fontSize: '28rpx', width: '200rpx', height: '50rpx' }"
              hover-class="background:#fff"
              @click="getSmsCode"
            >
              {{ form.codeText }}
            </u-button>
          </u-form-item>
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="180" label="密码：" prop="code">
            <u-input
              v-model="form.password"
              placeholder="请输入您的密码"
              :border="false"
              type="password"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
              :clearable="true"
              :password-icon="true"
            />
          </u-form-item>
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="180" label="确认密码：" prop="code">
            <u-input
              v-model="form.passwordTrue"
              placeholder="请确认您的密码"
              :border="false"
              type="password"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
              :clearable="true"
              :password-icon="true"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="sjmima-button">
        <view class="wxbuton">
          <u-button type="primary" shape="circle" :custom-style="{ height: '88rpx' }" hover-class="none" @click="toRegisterUser">
            <text class="login-wxfont">注册</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 隐私政策 -->
    <view class="sjmima-checkbox">
      <label class="radio">
        <checkbox-group @change="iAgree = !iAgree">
          <label>
            <checkbox value="cb" :checked="iAgree" color="rgba(51, 51, 51, 0.7)" style="transform: scale(0.6)" />
            我已阅读并同意
            <text class="link" @click="$u.route('/pages/index/agreement/index')">《用户服务协议》</text>
            和
            <text class="link" @click="$u.route('/pages/index/privacy/index')">《隐私政策》</text>
          </label>
        </checkbox-group>
      </label>
    </view>
  </view>
</template>

<script>
  import { sendSmsCode, registerUser, getImgCaptcha } from '@/utils/login'

  export default {
    name: 'registerPage',
    data() {
      return {
        iAgree: false,
        form: {
          phone: '',
          captcha: '',
          imgCaptcha: {},

          password: '',
          passwordTrue: '',

          smsCode: '',
          codeText: '获取验证码',
          btnBool: false
        }
      }
    },
    onLoad() {},
    onShow() {
      // await this.initImgCaptcha()
    },
    created() {},
    methods: {
      /**
       * 用户服务和隐私政策选中
       */
      checkboxIsAgree() {
        this.iAgree = !this.iAgree
      },
      /**
       * 未选中用户服务和隐私政策
       */
      notClickedAgree() {
        this.$u.toast('请阅读协议')
      },
      /**
       * 获取图片验证码
       * @returns {Promise<void>}
       */
      async initImgCaptcha() {
        this.form.imgCaptcha = await getImgCaptcha()
      },
      /**
       * 获取短信验证码
       */
      async getSmsCode() {
        if (!this.form.phone) {
          this.$u.toast('请输入手机号!')
          return
        }
        // if (!this.form.captcha) {
        //   this.$u.toast('请输入图形验证码!')
        //   return
        // }
        const smsParams = {
          phone: this.form.phone
          // code: this.form.captcha,
          // uuid: this.form.imgCaptcha.uuid
        }
        const isSuccess = await sendSmsCode(smsParams)
        if (isSuccess) {
          this.countdown()
        }
        // else {
        //   await this.initImgCaptcha()
        // }
      },
      /**
       * 短信验证码倒计时
       */
      countdown() {
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
      // 注册
      async toRegisterUser() {
        const strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        // 密码登录提交
        if (!this.form.phone) {
          this.$u.toast('请输入手机号!')
          return
        }
        if (!strTemp.test(this.form.phone)) {
          this.$u.toast('请输入正确手机号!')
          return
        }
        if (!this.form.smsCode) {
          this.$u.toast('请输入您的验证码!')
          return
        }
        if (!this.form.password) {
          this.$u.toast('请输入您的密码!')
          return
        }
        if (this.form.password !== this.form.passwordTrue) {
          this.$u.toast('两次密码不一致!')
          return
        }
        if (!this.iAgree) {
          this.$u.toast('请阅读协议!')
          return
        }
        const user = {
          phone: this.form.phone,
          // todo 密码加密传输
          // password: encrypt(this.form.password),
          password: this.form.password,
          smsCode: this.form.smsCode
          // code: this.form.captcha,
          // uuid: this.form.imgCaptcha.uuid
        }
        const isSuccess = await registerUser(user)
        if (isSuccess) {
          // 注册成功跳转路径
          setTimeout(() => {
            this.$Router.push({ path: '/pages/login/login' })
          }, 800)
        } else {
          // await this.initImgCaptcha()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/pages/login/login.scss';
</style>
