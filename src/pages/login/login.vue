<template>
  <view>
    <!-- 微信登陆 -->
    <view v-if="loginType === 0">
      <view class="login-header">
        <image src="@/static/images/login_bgimg.png" mode="widthFix" class="login-logoimg" />
        <view class="title-font">欢迎使用！</view>
      </view>
      <view class="login-button">
        <view v-show="!iAgree" key="1" class="wxbuton">
          <u-button shape="circle" hover-class="none" @click="notClickedAgree()">
            <text class="login-wxfont">微信用户一键登录</text>
          </u-button>
        </view>
        <view v-show="iAgree" key="2" class="wxbuton">
          <u-button type="success" shape="circle" hover-class="none" open-type="getPhoneNumber" @getphonenumber="toWxLogin">
            <text class="login-wxfont">微信用户一键登录</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 其他方式登录 -->
    <view v-if="loginType !== 0">
      <view class="sjmima-header">
        <view class="title-font">欢迎使用！</view>
      </view>
      <!-- 账号密码登录 -->
      <view class="form-warp" v-if="loginType === 1">
        <u-form ref="uForm" :model="form">
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="130" label="账号：" prop="name">
            <u-input
              v-model="form.phone"
              placeholder="请输入手机号或邮箱"
              :border="false"
              type="text"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
            />
          </u-form-item>
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="130" label="密码：" prop="code">
            <view style="display: flex">
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
              <view class="wjmm" @click="doRouter('/pages/login/forgotPassword')">忘记密码</view>
            </view>
          </u-form-item>
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="130" label="验证码：" prop="code">
            <view style="display: flex">
              <u-input
                v-model="form.captcha"
                placeholder="请输入您的验证码"
                :border="false"
                maxlength="6"
                type="text"
                :custom-style="{ color: '#494949', fontSize: '28rpx' }"
                placeholder-style="color: #B2B2B2; font-size: 28rpx;"
              />
              <u-image class="captchaImg" width="240rpx" height="72rpx" :fade="false" :src="form.imgCaptcha.img" @click="initImgCaptcha()" />
            </view>
          </u-form-item>
        </u-form>
        <view class="qtdl-box">
          <text @click="doRouter('/pages/login/register')">注册账号</text>
        </view>
      </view>
      <!-- 短信验证码登录 -->
      <view class="form-warp" v-if="loginType === 2">
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
              @click="getSmsCode"
            >
              {{ form.codeText }}
            </u-button>
          </u-form-item>
        </u-form>
        <view class="qtdl-box">
          <text @click="doRouter('/pages/login/register')">注册账号</text>
        </view>
      </view>

      <view class="sjmima-button">
        <view class="wxbuton">
          <u-button type="primary" shape="circle" :custom-style="{ height: '88rpx' }" hover-class="none" @click="otherLogins">
            <text class="login-wxfont">登录</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 隐私政策 -->
    <view class="sjmima-checkbox">
      <label class="radio">
        <checkbox-group @change="iAgree = !iAgree">
          <label>
            <checkbox value="checkbox" :checked="iAgree" color="rgba(51, 51, 51, 0.7)" style="transform: scale(0.6)" />
            我已阅读并同意
            <text class="link" @click="doRouter('/pages/index/agreement/index')">《用户服务协议》</text>
            和
            <text class="link" @click="doRouter('/pages/index/privacy/index')">《隐私政策》</text>
          </label>
        </checkbox-group>
      </label>
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
        loginType: 0,
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
        }
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
        //   this.initImgCaptcha()
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
      // 返回页面
      callbackUrl() {
        if (this.vuex_login_page_back_url) {
          // 存在back_url
          switch (
            this.vuex_login_page_back_biz_type // 判断业务场景
          ) {
            case 'A01': // Webview H5详情页跳转小程序登录页面
              //   if (this.vuex_login_page_back_is_webview) {
              //     // 是否是webview
              //     const backJson = urlToToObj(this.vuex_login_page_back_url)
              //     backJson['token'] = this.vuex_access_token
              //     const prefixUrl = this.vuex_login_page_back_url.split('?')[0]
              //     const backUrl = objToUrl(backJson, prefixUrl)
              //     this.$u.route({
              //       url: 'pages/index/webview/index',
              //       type: this.vuex_login_page_back_is_webview === '' ? 'navigateTo' : this.vuex_login_page_back_is_webview,
              //       params: {
              //         url: encodeURIComponent(backUrl),
              //         backUrl: 'pages/index/login/index'
              //       }
              //     })
              //   } else {
              //     this.$u.route({
              //       url: decodeURIComponent(this.vuex_login_page_back_url),
              //       type: this.vuex_login_page_back_is_webview === '' ? 'navigateTo' : this.vuex_login_page_back_is_webview
              //     })
              //   }
              break
            default:
              this.toIndexPage()
              break
          }
        } else {
          this.toIndexPage()
        }
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
        const strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        // 密码登录提交
        if (this.loginType === 1) {
          if (!this.form.phone) {
            this.$u.toast('请输入手机号或邮箱!')
            return
          }
          if (!strTemp.test(this.form.phone) && !emailReg.test(this.form.phone)) {
            this.$u.toast('请输入正确手机号或邮箱!')
            return
          }
          if (!this.form.captcha) {
            this.$u.toast('请输入图形验证码!')
            return
          }
          if (!this.form.password) {
            this.$u.toast('请输入您的密码!')
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
            code: this.form.captcha,
            uuid: this.form.imgCaptcha.uuid
          }
          await this.toLogin(user)
        } else if (this.loginType === 2) {
          // 手机验证码登录
          if (!this.form.phone) {
            this.$u.toast('请输入手机号!')
            return
          }
          if (!strTemp.test(this.form.phone)) {
            this.$u.toast('请输入正确手机号!')
            return
          }
          //   if (!this.form.captcha) {
          //     this.$u.toast('请输入图形验证码!')
          //     return
          //   }
          if (!this.form.smsCode) {
            this.$u.toast('请输入您的验证码!')
            return
          }
          if (!this.iAgree) {
            this.$u.toast('请阅读协议!')
            return
          }
          const user = {
            phone: this.form.phone,
            // code: this.form.captcha,
            // uuid: this.form.imgCaptcha.uuid,
            smsCode: this.form.smsCode
          }
          await this.toLogin(user)
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
            this.$u.route('/pages/index/login/wxauth')
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
  @import '@/pages/login/login.scss';
</style>
