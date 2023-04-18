<template>
  <view>
    <!-- 微信登陆 -->
    <view v-if="loginStatus == 0">
      <view class="login-header">
        <image src="@/static/images/login_bgimg.png" mode="widthFix" class="login-logoimg" />
        <view class="title-font">欢迎使用！</view>
      </view>
      <view class="login-button">
        <view v-show="!isAgree" key="1" class="wxbuton">
          <u-button shape="circle" hover-class="none" @click="notClickedAgree()">
            <text class="login-wxfont">微信用户一键登录</text>
          </u-button>
        </view>

        <view v-show="isAgree" key="2" class="wxbuton">
          <u-button type="success" shape="circle" hover-class="none" open-type="getPhoneNumber" @getphonenumber="getphonenumberWx">
            <text class="login-wxfont">微信用户一键登录</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 其他方式登录 -->
    <view v-if="loginStatus !== 0">
      <view class="sjmima-header">
        <view class="title-font">欢迎使用！</view>
      </view>
      <!-- 密码登录 -->
      <view class="form-warp" v-if="loginStatus == 1">
        <u-form ref="uForm" :model="form">
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="100" label="账号：" prop="name">
            <u-input
              v-model="form.phone"
              placeholder="请输入手机号或邮箱"
              :border="false"
              type="text"
              :custom-style="{ color: '#494949', fontSize: '28rpx' }"
              placeholder-style="color: #B2B2B2; font-size: 28rpx;"
            />
          </u-form-item>
          <u-form-item :label-style="{ color: '#494949', fontSize: '28rpx', height: '30rpx' }" label-width="100" label="密码：" prop="code">
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
        </u-form>
        <view class="qtdl-box">
          <text @click="doRouter('/pages/login/register')">注册账号</text>
        </view>
      </view>
      <!-- 验证码登录 -->
      <view class="form-warp" v-if="loginStatus == 2">
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
        </u-form>
        <view class="qtdl-box">
          <text @click="doRouter('/pages/login/register')">注册账号</text>
        </view>
      </view>

      <view class="sjmima-button">
        <view class="wxbuton">
          <u-button type="primary" shape="circle" :custom-style="{ height: '88rpx' }" hover-class="none" @click="loginDenlu">
            <text class="login-wxfont">登录</text>
          </u-button>
        </view>
      </view>
    </view>
    <!-- 隐私政策 -->
    <view class="sjmima-checkbox">
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
    </view>
    <view class="otherLogin">
      <u-divider>其他登陆方式</u-divider>
      <!-- 切换按钮 -->
      <view class="loginWay">
        <view v-if="loginStatus !== 0" @click="wxLogin">
          <image src="@/static/images/wxdl.png"></image>
          <view>微信登陆</view>
        </view>
        <view v-if="isAccount" @click="cutLoginType(1)">
          <image src="@/static/images/zhdl.png"></image>
          <view>账户登录</view>
        </view>
        <view v-if="isPhone" @click="cutLoginType(2)">
          <image src="@/static/images/sjyz.png"></image>
          <view>手机验证</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'loginPage',
    data() {
      return {
        isAccount: true,
        isPhone: true,
        loginStatus: 0, // 0微信一键登录，1密码登录，2手机验证码登录

        isAgree: false,
        // 弹窗提示
        glcontent: '请先阅读《用户服务协议》和《隐私政策》并同意确认勾选！',
        glShow: false,

        typeButton: 'warning',
        wxCode: null,
        sessionKey: null,

        // 其他登录
        form: {
          phone: '',
          captcha: '',
          imgCaptcha: {},

          password: '',

          smsCode: '',
          codeText: '获取验证码',
          btnBool: false
        }
      }
    },
    onLoad(options) {
      console.log('-----------')
      this.$u.vuex('vuex_login_page_back_url', decodeURIComponent(options.callbackUrl)) // 返回的页面地址
      this.$u.vuex('vuex_login_page_back_biz_type', options.bizType) // 业务类型
      this.$u.vuex('vuex_login_page_back_params', options.callbackParams) // 返回参数 用于透传
      this.$u.vuex('vuex_login_page_back_type', options.callbackType) // 返回类型
      this.$u.vuex('vuex_login_page_back_is_webview', options.isWebview) // 是否是webview
      // 如果是微信的话，就去获取登录的wxcode
      // #ifdef MP-WEIXIN
      this.getWxCode()
      // #endif
    },
    onShow() {},
    created() {
      // 获取图片验证码
      //   this.getImgCaptcha()
    },
    methods: {
      wxLogin() {
        this.loginStatus = 0
        this.isPhone = true
        this.isAccount = true
      },
      cutLoginType(name) {
        if (name == 1) {
          this.loginStatus = 1
          this.isAccount = false
          this.isPhone = true
          return
        }
        if (name == 2) {
          this.loginStatus = 2
          this.isPhone = false
          this.isAccount = true
        }
      },
      // 跳转
      doRouter(url) {
        // 路由跳转
        this.$Router.push({ path: url, query: { name: 'wang' } })
        // 在onLoad中使用this.$Route.query获取参数
      },
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
      // 微信登录
      getphonenumberWx() {
        // console.log(loginInfo)
        // const params = {
        //   ...loginInfo.detail,
        //   wxCode: this.wxCode,
        //   invitationCode: this.vuex_user_inviter
        // }
        // wxMiniAppLogin(this, params)
        //   .then((info) => {
        //     if (info.code === '00000') {
        //       const data = info.data
        //       this.$u.vuex('vuex_access_token', data.access_token)
        //       this.$u.vuex('vuex_refresh_token', data.refresh_token)
        //       this.$u.vuex('vuex_user_info', data.user_info)
        //       this.getUserVipGrade()
        //       this.$u.toast('登录成功！')
        //     } else {
        //       this.getWxCode()
        //     }
        //   })
        //   .then((e) => {
        //     // 返回页面
        //     this.callbackUrl()
        //   })
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
      checkboxIsAgree() {
        this.isAgree = !this.isAgree
        this.typeButton = this.isAgree ? 'success' : 'warning'
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
      // 获取图片验证码
      getImgCaptcha() {
        // code(this).then((e) => {
        //   this.form.imgCaptcha = e.data
        // })
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
      // 显示手机验证码登录
      phoneCodeLoginShow() {
        this.loginStatus = 2
      },
      // 其他登录
      loginDenlu() {
        const strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        // 密码登录提交
        if (this.loginStatus === 1) {
          if (!this.form.phone) {
            this.$u.toast('请输入手机号或邮箱!')
            return
          }
          if (!strTemp.test(this.form.phone) && !emailReg.test(this.form.phone)) {
            this.$u.toast('请输入正确手机号或邮箱!')
            return
          }
          //   if (!this.form.captcha) {
          //     this.$u.toast('请输入图形验证码!')
          //     return
          //   }
          if (!this.form.password) {
            this.$u.toast('请输入您的密码!')
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
        } else if (this.loginStatus === 2) {
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
          if (!this.isAgree) {
            this.$u.toast('请阅读协议!')
            return
          }
          //   const user = {
          //     phone: this.form.phone,
          //     code: this.form.captcha,
          //     uuid: this.form.imgCaptcha.uuid,
          //     smsCode: this.form.smsCode,
          //     invitationCode: this.vuex_user_inviter
          //   }
          //   loginByPhoneCaptcha(this, user).then((e) => {
          //     if (e.code && e.code !== '00000') {
          //       this.$u.toast(e.message)
          //       setTimeout(() => {
          //         this.getImgCaptcha()
          //       }, 1500)
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
      },
      getUserVipGrade() {
        // const params = {
        //   phone: this.vuex_user_info.account
        // }
        // getVipGrade(this, params).then((res) => {
        //   if (res.data) {
        //     this.$u.vuex('vuex_user_vip_grade', res.data[0])
        //   }
        // })
      }
    }
  }
</script>

<style lang="scss">
  @import '@/pages/login/login.scss';
</style>
