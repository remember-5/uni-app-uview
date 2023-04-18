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
              @click="getyzm"
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
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="180" label="密码：" prop="code">
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
          <u-button type="primary" shape="circle" :custom-style="{ height: '88rpx' }" hover-class="none" @click="loginDenlu">
            <text class="login-wxfont">提交</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 隐私政策 -->
    <!-- <view class="sjmima-checkbox">
      <label class="radio">
        <checkbox-group @change="checkboxIsAgree">
          <label>
            <checkbox value="cb" :checked="isAgree" color="rgba(51, 51, 51, 0.7)" style="transform: scale(0.6)" />
            我已阅读并同意
            <text class="link" @click="$u.route('/pages/index/agreement/index')">《用户服务协议》</text>
            和
            <text class="link" @click="$u.route('/pages/index/privacy/index')">《隐私政策》</text>
          </label>
        </checkbox-group>
      </label>
    </view> -->
  </view>
</template>

<script>
  export default {
    name: 'loginPage',
    data() {
      return {
        isAgree: false,
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
    onShow() {},
    created() {},
    methods: {
      checkboxIsAgree() {
        this.isAgree = !this.isAgree
      },
      notClickedAgree() {
        this.$u.toast('请阅读协议')
      },
      toIndexPage() {
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/tabbar/index'
          })
        }, 800)
      },
      // 获取验证码
      getyzm() {
        if (!this.form.phone) {
          this.$u.toast('请输入手机号!')
          return
        }

        // const useryzm = {
        //   phone: this.form.phone,
        //   code: this.form.captcha,
        //   uuid: this.form.imgCaptcha.uuid
        // }
        // smsCode(this, useryzm)
        //   .then((res) => {
        //     if (res.code === '00000') {
        //       this.setDaojishi()
        //     } else {
        //       this.$u.toast(res.message)
        //       setTimeout(() => {
        //         this.getImgCaptcha()
        //       }, 1500)
        //     }
        //   })
        //   .catch((err) => {
        //     console.error(err)
        //     this.$u.toast(err.message)
        //   })
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
      // 勾选
      checkboxIsAgreeQita() {
        this.isAgree = !this.isAgree
      },
      // 其他登录
      loginDenlu() {
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
        if (!this.form.password) {
          this.$u.toast('请输入您的密码!')
          return
        }
        if (this.form.password !== this.form.passwordTrue) {
          this.$u.toast('两次密码不一致!')
          return
        }
        if (!this.isAgree) {
          this.$u.toast('请阅读协议!')
          return
        }

        //   const user = {
        //     phone: this.form.phone,
        //     password: encrypt(this.form.password),
        //     code: this.form.captcha,
        //     uuid: this.form.imgCaptcha.uuid
        //   }
        //   loginByAccount(this, user).then((e) => {
        //     if (e.code && e.code !== '00000') {
        //       this.$u.toast(e.message)
        //       this.getImgCaptcha()
        //     } else {
        //       this.$u.vuex('vuex_access_token', e.data.access_token)
        //       this.$u.vuex('vuex_refresh_token', e.data.refresh_token)
        //       this.$u.vuex('vuex_user_info', e.data.user_info)
        //       this.getUserVipGrade()
        //       this.$u.toast('登录成功！')
        //       setTimeout(() => {
        //         this.$u.route('/pages/index/login/wxauth')
        //       }, 800)
        //     }
        //   })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/pages/login/login.scss';
</style>
