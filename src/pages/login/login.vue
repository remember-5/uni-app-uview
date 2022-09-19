<template>
  <view class="wrap">
    <view class="top" />
    <view class="content">
      <view class="title">
        <image
          src="@/static/icon/logo.png"
          mode="widthFix"
        />
        欢迎登录
      </view>
      <view class="login-title">
        <view>
          <text
            :class="type==0?'active':''"
            @click="type = 0"
          >
            登录
          </text>
        </view>
        <view>
          <text
            :class="type==1?'active':''"
            @click="type = 1"
          >
            注册
          </text>
        </view>
      </view>
      <view v-if="type===0">
        <view class="u-border-bottom">
          <u-input
            v-model="phone"
            type="text"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>
        <view class="u-border-bottom">
          <u-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          />
        </view>
        <view class="u-border-bottom">
          <u-input
            v-model="captcha"
            type="text"
            maxlength="11"
            placeholder="请输入图形验证码"
          />
          <u-image
            class="captchaImg"
            width="240rpx"
            height="72rpx"
            :fade="false"
            :src="imgCaptcha.img"
            @click="getImgCaptcha()"
          />
        </view>
        <view class="hint">
          <label class="radio">
            <u-checkbox
              v-model="isAgree"
              shape="circle"
            />
            我已阅读
            <text
              class="link"
              @click="$u.route('/pages/user/protocol')"
            >服务协议</text>
            和
            <text
              class="link"
              @click="$u.route('/pages/user/protocol')"
            >隐私政策</text>
          </label>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button
          :style="[inputStyle]"
          style="margin-bottom: 20px;"
          class="getCaptcha"
          open-type="getPhoneNumber"
          @tap="wxlogin"
          @getphonenumber="getphonenumberWx"
        >
          微信账号一键登录
        </button>
        <!-- #endif -->
        <!-- #ifdef MP-ALIPAY -->
        <button
          :style="[inputStyle]"
          style="margin-bottom: 20px;"
          class="getCaptcha"
          open-type="getPhoneNumber"
          @tap="zfblogin"
          @getphonenumber="getPhoneNumberZFB"
        >
          支付宝账号一键登录
        </button>
        <!-- #endif -->
        <button
          :style="[inputStyle]"
          class="getCaptcha"
          @tap="login"
        >
          登录
        </button>
        <!-- <view class="forget">
          <text @click="toForget">忘记密码</text>
        </view> -->
        <view class="password_register">
          <text @click="$u.route('/pages/user/register')">
            注册账号
          </text>
          <text @click="$u.route('/pages/login/forgetPassword')">
            忘记密码？
          </text>
        </view>
      </view>

      <view v-else-if="type===1">
        <view class="u-border-bottom">
          <u-input
            v-model="phone"
            type="text"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </view>
        <view class="u-border-bottom">
          <u-input
            v-model="password1"
            type="password"
            placeholder="输入密码"
          />
        </view>
        <view class="u-border-bottom">
          <u-input
            v-model="password2"
            type="password"
            placeholder="再次输入密码"
          />
        </view>
        <view class="u-border-bottom">
          <u-input
            v-model="captcha"
            type="text"
            maxlength="11"
            placeholder="请输入图形验证码"
          />
          <u-image
            class="captchaImg"
            width="240rpx"
            height="72rpx"
            :fade="false"
            :src="imgCaptcha.img"
            @click="getImgCaptcha()"
          />
        </view>

        <view class="u-border-bottom">
          <u-input
            v-model="yzm"
            type="text"
            placeholder="请输入短信验证码"
          />
          <u-button
            class="code-btn"
            :disabled="btnBool"
            type="default"
            :hair-line="false"
            :custom-style="{background:'#FFFFFF',color: '#FF4848',fontSize: '28rpx',border: 'none'}"
            hover-class="background:#fff"
            @click="getPhoneCaptcha"
          >
            {{ codeText }}
          </u-button>
        </view>

        <view class="hint">
          <label class="radio">
            <u-checkbox
              v-model="isAgree"
              shape="circle"
            />
            我已阅读
            <text
              class="link"
              @click="toUserAgreement"
            >服务协议</text>
            和
            <text
              class="link"
              @click="toPrivacy"
            >隐私政策</text>
          </label>
        </view>
        <button
          :style="[inputStyle]"
          class="getCaptcha"
          @tap="register"
        >
          注册
        </button>
      </view>
    </view>
    <view class="buttom">
      <view class="loginType" />
    </view>
  </view>
</template>

<script>
import {
  encrypt
} from '@/common/rsaEncrypt.js'
import {
  register, loginByAccount, loginByWx, code, captchaByRegister
} from '@/api/user.js'

export default {
  data() {
    return {
      phone: '',
      password: '',
      password1: '',
      password2: '',
      type: 0,
      show: true,
      second: 60,
      isAgree: false,
      captcha: '',
      flag: false,
      imgCaptcha: {},
      yzm: '',
      codeText: '获取验证码',
      btnBool: false,
      wxcode: null
    }
  },
  computed: {
    inputStyle() {
      return {
        color: '#fff',
        backgroundColor: '#C72323',
        opacity: 1
      }
    }
  },
  created() {
    this.getImgCaptcha()
  },
  methods: {
    // 微信登录
    wxlogin() {
      const that = this
      uni.login({
        provider: 'weixin',
        success(loginRes) {
          that.wxcode = loginRes.code
        }
      })
    },
    // 支付宝登录
    zfblogin() {},
    // 验证码
    getPhoneCaptcha() {
      if (!this.phone) {
        this.$u.toast('请输入手机号！')
        return
      }
      if (!this.captcha) {
        this.$u.toast('请输入图形验证码！')
        return
      }

      captchaByRegister(this, this.phone).then((res) => {
        if (res.code === '00000') {
          this.setDaojishi()
        } else {
          this.$u.toast(res.message)
        }
      }).catch((err) => {
        console.error(err)
        this.$u.toast(err.message)
      })
    },
    // 验证码倒计时
    setDaojishi() {
      let i = 59
      this.codeText = '60s后重新获取'
      this.btnBool = true
      const timer = setInterval(() => {
        this.btnBool = true
        this.codeText = `${i}s后重新获取`
        i--
        if (i < 0) {
          this.btnBool = false
          this.codeText = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
    // 获取图片验证码
    getImgCaptcha() {
      code(this).then((e) => {
        this.imgCaptcha = e.data
      })
    },
    // 登录
    login() {
      if (!this.phone) {
        this.$u.toast('请输入手机号！')
        return
      }
      if (!this.password) {
        this.$u.toast('请输入密码！')
        return
      }
      if (!this.captcha) {
        this.$u.toast('请输入图形验证码！')
        return
      }
      if (!this.isAgree) {
        this.$u.toast('请阅读并同意条款！')
        return
      }

      const user = {
        phone: this.phone,
        password: encrypt(this.password),
        code: this.captcha,
        uuid: this.imgCaptcha.uuid
      }

      loginByAccount(this, user).then((e) => {
        if (e.code === '00000') {
          const data = e.data
          this.$u.vuex('vuex_access_token', data.access_token)
          this.$u.vuex('vuex_refresh_token', data.refresh_token)
          this.$u.vuex('vuex_user_info', data.user_info)
          this.$u.toast('登录成功！')
          setTimeout(() => {
            this.$u.route({
              url: 'pages/index/index',
              type: 'switchTab'
            })
          }, 800)// 延时0.8秒
        } else {
          // this.$u.toast(e.message);
          this.$u.toast('账号或密码错误')
          this.getImgCaptcha()
          // this.getyzm();
        }
      })
    },
    getphonenumberWx(e) {
      const that = this
      loginByWx(that, {
        loginType: 4,
        code: that.wxcode,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }).then((res) => {
        if (res.code !== '00000') {
          that.$u.toast('登录失败！')
          that.wxlogin()
        }
        this.$u.vuex('vuex_access_token', res.data.access_token)
        this.$u.vuex('vuex_refresh_token', res.data.refresh_token)
        this.$u.vuex('vuex_user_info', res.data.user_info)
        that.$u.toast('登录成功！')
        that.$u.route({
          url: 'pages/index/index',
          type: 'switchTab'
        })
      })
    },
    getPhoneNumberZFB() {
      // getPhoneNumber({
      //   success: (res) => {
      //     // 获取到支付宝服务器返回的加密数据
      //     // 其中 response 为 JSON 字符串，结构为：'{"response":"xxxxx","sign":"xxx"}'
      //     // const { respone, ariverRpcTraceId } = res
      //     console.log(res)
      //     // 将加密数据传给后端，结合签名算法和AES密钥进行解密获取手机号
      //     // my.request({
      //     // 	url: '后端服务端 URL',
      //     // 	data: respone,
      //     // 	success: res => {
      //     // 		// 解密成功返回
      //     // 	},
      //     // 	fail: err => {
      //     // 		console.warn('my.request fail: ', err)
      //     // 	}
      //     // })
      //   },
      //   fail: (err) => {
      //     console.warn('my.getPhoneNumber fail: ', err)
      //   }
      // })
    },
    // 注册用户
    register() {
      if (!this.phone) {
        this.$u.toast('请输入手机号！')
        return
      }
      if (!this.password1) {
        this.$u.toast('请输入密码！')
        return
      }
      if (this.password1 !== this.password2) {
        this.$u.toast('两次输入密码不一致!')
        return
      }
      if (!this.captcha) {
        this.$u.toast('请输入图形验证码！')
        return
      }
      if (!this.yzm) {
        this.$u.toast('请输入短信验证码！')
        return
      }
      if (!this.isAgree) {
        this.$u.toast('请阅读并同意条款！')
        return
      }

      const user = {
        phone: this.phone,
        password: encrypt(this.password1),
        smsCode: this.yzm,
        code: this.captcha,
        uuid: this.imgCaptcha.uuid
      }
      register(this, user).then((e) => {
        if (e.code === '00000') {
          this.$u.toast('注册成功，请登录！')
          setTimeout(() => {
            this.$u.route({
              url: 'pages/login/login'
            })
          }, 800)// 延时0.8秒
        } else {
          this.$u.toast(e.message)
          this.getImgCaptcha()
          // this.getyzm();
        }
      })
    },
    toForget() {
      this.$u.route({
        url: 'pages/login/forget'
      })
    },
    // 跳转用户协议
    toUserAgreement() {
      this.$u.route('pages/userAgreement/index')
    },
    // 跳转隐私政策
    toPrivacy() {
      this.$u.route('pages/privacy/index')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style/base.scss';

.password_register {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  //text-align: center;

  text {
    font-size: 28rpx;
    color: #333333;
    //text-decoration: underline;
  }
}

.wrap {
  font-size: 28rpx;

  .login-title {
    display: flex;
    padding: 0 20rpx;
    margin-bottom: 60rpx;

    view {
      flex: 1;
      text-align: center;

      text {
        padding: 24rpx 0;
        font-size: 36rpx;

        &.active {
          position: relative;
          color: #C72323;

          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 100%;
            height: 2px;
            background-color: #C72323;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

  .content {
    width: 600rpx;
    margin: 80rpx auto 0;

    .title {
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 60rpx;
      font-weight: 500;
      margin-bottom: 100rpx;

      image {
        width: 100rpx;
        margin-right: 20rpx;
      }
    }

    input {
      text-align: left;
      margin-bottom: 10rpx;
      padding-bottom: 6rpx;
    }

    .tips {
      color: $u-type-info;
      margin-bottom: 60rpx;
      margin-top: 8rpx;
    }

    .getCaptcha {
      height: 100rpx;
      background-color: $blue;
      color: #fff;
      border: none;
      font-size: 30rpx;
      line-height: 100rpx;
      border-radius: 50rpx;
      opacity: .6;

      &::after {
        border: none;
      }
    }

    .alternative {
      color: $u-tips-color;
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
    }
  }

  .buttom {
    .loginType {
      display: flex;
      padding: 350rpx 150rpx 150rpx 150rpx;
      justify-content: space-between;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $u-content-color;
        font-size: 28rpx;
      }
    }

  }
}

.hint {
  padding: 40rpx 0;
  font-size: 28rpx;
  color: $u-tips-color;

  .link {
    color: $blue;
  }
}

.u-border-bottom {
  position: relative;
  padding: 10rpx 0;

  .captcha {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.forget {
  padding: 20rpx 0 40rpx;
  text-align: right;
  //color:$blue
}

.captchaImg {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 240rpx;
  height: 72rpx;
}

.code-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 160rpx;
  color: #C72323;
}

button[disabled] {
  color: #B2B2B2 !important;
  background: #FFFFFF !important;
}
</style>
