<template>
  <view>
    <!-- 微信登陆 -->
    <view v-if="loginType === 0">
      <view class="login-header">
        <image class="bg-img" src="@/static/images/login_bg_img.png" mode="widthFix" />
        <view class="title-font">欢迎使用！</view>
      </view>
      <view class="login-button">
        <u-button v-show="!iAgree" key="1" shape="circle" hover-class="none" @click="notClickedAgree()"> 微信用户一键登录 </u-button>
        <u-button v-show="iAgree" key="2" type="success" shape="circle" hover-class="none" open-type="getPhoneNumber" @getphonenumber="toWxLogin">
          微信用户一键登录
        </u-button>
      </view>
    </view>
    <!-- 其他方式登录 -->
    <view v-if="loginType !== 0">
      <view class="sms-code-header title_font">欢迎使用！</view>
      <!-- 账号密码登录 -->
      <view class="form-warp" v-if="loginType === 1">
        <u-form ref="passwordForm" :model="form">
          <u-form-item label-width="130" label="账号：" prop="phone">
            <u-input v-model="form.phone" placeholder="请输入账号" type="text" />
          </u-form-item>
          <u-form-item label-width="130" label="密码：" prop="password">
            <view class="password_flex">
              <u-input v-model="form.password" placeholder="请输入您的密码" :border="false" type="password" :clearable="true" :password-icon="true" />
              <view class="forget-password" @click="doRouter('/pages/public/forgotPassword')">忘记密码</view>
            </view>
          </u-form-item>
          <u-form-item label-width="130" label="验证码：" prop="captcha">
            <view class="d_flex">
              <u-input v-model="form.captcha" placeholder="请输入您的验证码" :border="false" maxlength="6" type="text" />
              <u-image width="240rpx" height="72rpx" :fade="false" :src="form.imgCaptcha.img" @click="initImgCaptcha()" />
            </view>
          </u-form-item>
        </u-form>
        <view class="register-box" @click="doRouter('/pages/public/register')">注册账号</view>
      </view>
      <!-- 短信验证码登录 -->
      <view class="form-warp" v-if="loginType === 2">
        <u-form ref="smsForm" :model="form">
          <u-form-item :label-style="labelStyle[1]" label-width="180" label="手机号：" prop="phone">
            <u-input
              v-model="form.phone"
              type="text"
              placeholder="请输入您的手机号"
              :border="false"
              :custom-style="labelStyle[0]"
              :placeholder-style="placeholder_style"
            />
          </u-form-item>
          <u-form-item :label-style="labelStyle[1]" label-width="180" label="短信验证码：" prop="smsCode">
            <u-input
              v-model="form.smsCode"
              type="text"
              placeholder="请输入您的验证码"
              maxlength="6"
              :border="false"
              :custom-style="labelStyle[0]"
              :placeholder-style="placeholder_style"
            />
            <u-button
              slot="right"
              class="code-btn"
              :disabled="form.btnBool"
              type="default"
              shape="circle"
              :custom-style="labelStyle[2]"
              hover-class="background:#fff"
              @click="getSmsCode"
            >
              {{ form.codeText }}
            </u-button>
          </u-form-item>
        </u-form>
        <view class="register-box" @click="doRouter('/pages/public/register')">
          注册账号
        </view>
      </view>

      <view class="sjmima-button">
        <u-button class="login-wxfont" type="primary" shape="circle" :custom-style="custom_style" hover-class="none" @click="otherLogins">登录</u-button>
      </view>
    </view>
    <!-- 隐私政策 -->
    <view class="sjmima-checkbox">
      <checkbox-group @change="iAgree = !iAgree">
        <label>
          <checkbox value="checkbox" :checked="iAgree" color="rgba(51, 51, 51, 0.7)" style="transform: scale(0.6)" />
          我已阅读并同意
          <text class="blue" @click="doRouter('/pages/public/agreement/index')">《用户服务协议》</text>
          和
          <text class="blue" @click="doRouter('/pages/public/privacy/index')">《隐私政策》</text>
        </label>
      </checkbox-group>
    </view>
    <view class="otherLogin">
      <u-divider>其他登陆方式</u-divider>
      <!-- 切换按钮 -->
      <view class="loginWay">
        <view v-if="loginType !== 0" @click="loginType = 0">
          <image src="@/static/images/login_wx_icon.png" />
          <view>微信登陆</view>
        </view>
        <view v-if="loginType !== 1" @click="loginType = 1">
          <image src="@/static/images/login_account_icon.png" />
          <view>账户登录</view>
        </view>
        <view v-if="loginType !== 2" @click="loginType = 2">
          <image src="@/static/images/login_sms_icon.png" />
          <view>短信验证</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getWxLoginCode, login, getImgCaptcha, sendSmsCode } from '@/utils/login'

  export default {
    name: 'LoginPage',
    data() {
      return {
        // 0 微信一键登录 1 密码登录 2 手机验证码登录
        loginType: 1,
        // 用户协议
        iAgree: false,
        // 微信登录需要
        wxCode: null,
        // 其他登录
        form: {
          // 手机号
          phone: '',
          // 输入验证码
          captcha: '',
          // 图形验证码图片
          imgCaptcha: {},
          // 密码
          password: '',
          // 短信验证码
          smsCode: '',
          // 显示提示
          codeText: '获取验证码',

          btnBool: false
        },
        passwordRules: {
          phone: [
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
              required: true,
              message: '请输入手机号',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            }
          ],
          password: [
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*()]).{8,}$/,
              required: true,
              message: '密码是8为以上包含大小写字母和数字和特殊字符',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            }
          ],
          captcha: [
            {
              required: true,
              message: '请输入验证码',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            }
          ]
        },
        smsRules: {
          phone: [
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
              required: true,
              message: '请输入手机号',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            }
          ],
          smsCode: [
            {
              required: true,
              message: '请输入验证码',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            }
          ]
        },
        labelStyle: [
          { color: '#494949', fontSize: '28rpx' },
          { color: '#494949', fontSize: '28rpx', height: '30rpx' },
          { background: '#FFFFFF', color: '#3F69FF', fontSize: '28rpx', width: '200rpx', height: '50rpx' }
        ],
        placeholder_style: 'color: #B2B2B2; font-size: 28rpx;',
        custom_style: {height: '88rpx'}
      }
    },
    onLoad() {
      // 在onLoad中使用this.$Route.query获取参数
      // console.log('-----------')
      // this.$u.vuex('vuex_login_page_back_url', decodeURIComponent(options.callbackUrl)) // 返回的页面地址
      // this.$u.vuex('vuex_login_page_back_biz_type', options.bizType) // 业务类型
      // this.$u.vuex('vuex_login_page_back_params', options.callbackParams) // 返回参数 用于透传
      // this.$u.vuex('vuex_login_page_back_type', options.callbackType) // 返回类型
      // this.$u.vuex('vuex_login_page_back_is_webview', options.isWebview) // 是否是webview
      // 如果是微信的话，就去获取登录的wxcode
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.passwordForm.setRules(this.passwordRules)
      this.$refs.smsForm.setRules(this.smsRules)
    },
    async onShow() {
      try {
        await this.initImgCaptcha()
        // #ifdef MP-WEIXIN
        await this.getWxCode()
        // #endif
      } catch (e) {
        this.$u.toast(e)
      }
    },
    methods: {
      /**
       * 路由跳转
       * @param url /
       * @param query /
       */
      doRouter(url, query) {
        // 路由跳转
        this.$Router.push({ path: url, query: query })
      },
      /**
       * 获取微信授权code
       * @returns {Promise<void>}
       */
      async getWxCode() {
        this.wxCode = await getWxLoginCode()
      },
      /**
       * 微信登录
       */
      async toWxLogin(wxLoginInfo) {
        const params = {
          wxCode: this.wxCode,
          ...wxLoginInfo.detail
        }
        await this.toLogin(params)
      },
      /**
       * 未选中服务条款
       */
      notClickedAgree() {
        if (!this.iAgree) {
          this.$u.toast('请勾选服务条款')
        }
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
        const smsParams = {
          phone: this.form.phone
        }
        const isSuccess = await sendSmsCode(smsParams)
        if (isSuccess) {
          this.countdown()
        }
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
      /**
       * 去首页
       */
      toIndexPage() {
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/tabbar/index'
          })
        }, 800)
      },
      /**
       * 其他登录方式
       * @returns {Promise<void>}
       */
      async otherLogins() {
        if (!this.iAgree) {
          this.$u.toast('请阅读协议!')
          return
        }

        // 密码登录提交
        if (this.loginType === 1) {
          this.$refs.passwordForm.validate(async (valid) => {
            const user = {
              phone: this.form.phone,
              // todo 密码加密传输
              // password: encrypt(this.form.password),
              password: this.form.password,
              code: this.form.captcha,
              uuid: this.form.imgCaptcha.uuid
            }
            await this.toLogin(user)
          })

        } else if (this.loginType === 2) {
          this.$refs.passwordForm.validate(async (valid) => {
            const user = {
              phone: this.form.phone,
              // code: this.form.captcha,
              // uuid: this.form.imgCaptcha.uuid,
              smsCode: this.form.smsCode
            }
            await this.toLogin(user)
          })
        }
      },
      /**
       * 去登录
       * @param user 登录用户信息
       * @returns {Promise<void>}
       */
      async toLogin(user) {
        const loginSuccess = await login(user, this.loginType)
        if (loginSuccess) {
          // 登录成功跳转路径
          setTimeout(() => {
            this.$u.route('/pages/public/wxauth')
          }, 800)
          // this.callbackUrl()
        } else {
          // 登录失败，对应事件
          switch (this.loginType) {
            case 0:
              // 重新获取 wxCode
              await this.getWxCode()
              break
            case 1:
              // 刷新图片验证码
              await this.initImgCaptcha()
              break
            case 2:
              // 短信登录
              // await this.initImgCaptcha()
              break
            default:
              break
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  // 登录
  .login-header {
    text-align: center;
    padding: 86rpx 86rpx 168rpx;
    .bg-img {
      width: 524rpx;
      height: 315rpx;
      margin: 0 auto 118rpx;
    }
    .title-font {
      font-size: 48rpx;
      color: #333333;
    }
  }

  .login-button {
    margin: 0 62rpx;
    text-align: center;
  }

  // 手机验证码登录和密码登录
  .sms-code-header {
    text-align: left;
    padding: 50rpx 62rpx 60rpx;
  }

  .title_font {
    font-size: 48rpx;
    font-weight: 500;
    color: #333333;
    margin-top: 42rpx;
    margin-left: 24rpx;
  }

  .form-warp {
    margin: 0 62rpx;
    button[disabled] {
      color: #b2b2b2 !important;
      background: #ffffff !important;
    }
    .register-box {
      margin-top: 32rpx;
      float: right;
      justify-content: flex-end;
      font-size: 32rpx;
      font-weight: 400;
      color: #3f69ff;
    }
    .password_flex {
      display: flex;
      u-input {
        flex: 1;
      }
      .forget-password {
        margin-left: 40rpx;
        color: rgb(144, 147, 153);
        font-size: 28rpx;
      }
    }
    .d_flex {
      display: flex;
    }
  }

  .sjmima-button {
    margin: 120rpx 62rpx 0rpx;
    text-align: center;
    .login-wxfont {
      margin-left: 12rpx;
    }
  }
  .sjmima-checkbox {
    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 32rpx 0rpx;
    ::v-deep .u-checkbox {
      margin-right: -12rpx;
    }
    ::v-deep .uni-label-pointer {
      display: flex;
      align-items: center;
    }
    .blue {
      color: #3f69ff;
    }
  }

  // 复选框
  ::v-deep uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
    border-color: rgba(51, 51, 51, 0.6);
  }

  ::v-deep uni-checkbox .uni-checkbox-input {
    margin-right: 5px;
    -webkit-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(51, 51, 51, 0.6);
    background-color: #fff;
    border-radius: 3px;
    width: 22px;
    height: 22px;
    position: relative;
  }

  //切换
  .otherLogin {
    position: fixed;
    bottom: 20rpx;
    left: 0;
    right: 0;
    .loginWay {
      margin-top: 30rpx;
      display: flex;
      justify-content: center;
      color: rgb(144, 147, 153);
      font-size: 26rpx;
      & > view {
        text-align: center;
      }
      & > view:nth-child(2) {
        margin-left: 60rpx;
      }
      image {
        width: 68rpx;
        height: 68rpx;
      }
    }
  }
</style>
