<template>
  <view>
    <view>
      <view class="sjmima-header">
        <view class="title-font">{{ $t('common.welcome') }}</view>
      </view>
      <view class="form-warp">
        <u-form ref="uForm" :model="form">
          <u-form-item label-width="180" :label="$t('login.form.phone.label')" prop="phone">
            <u-input
              v-model="form.phone"
              type="number"
              :placeholder="$t('login.form.phone.placeholder')"
              maxlength="11"
              :border="false"
            />
          </u-form-item>
          <u-form-item label-width="180" :label="$t('login.form.smsCode.label')" prop="smsCode">
            <u-input
              v-model="form.smsCode"
              type="text"
              :placeholder="$t('login.form.smsCode.placeholder')"
              :border="false"
              maxlength="6"
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
          <u-form-item label-width="180" :label="$t('login.form.password.label')" prop="password">
            <u-input
              v-model="form.password"
              type="password"
              :placeholder="$t('login.form.password.placeholder')"
              :border="false"
              :clearable="true"
              :password-icon="true"
            />
          </u-form-item>
          <u-form-item label-width="180" :label="$t('login.form.passwordTrue.label')" prop="passwordTrue">
            <u-input
              v-model="form.passwordTrue"
              type="password"
              :placeholder="$t('login.form.passwordTrue.placeholder')"
              :border="false"
              :clearable="true"
              :password-icon="true"
            />
          </u-form-item>
        </u-form>
      </view>
      <view class="sjmima-button">
        <u-button type="primary" shape="circle" :custom-style="{ height: '88rpx' }" hover-class="none" @click="toRegisterUser">
          <text class="login-wxfont">{{ $t('common.register') }}</text>
        </u-button>
      </view>
    </view>
    <!-- 隐私政策 -->
    <view class="sjmima-checkbox">
      <label class="radio">
        <checkbox-group @change="iAgree = !iAgree">
          <label>
            <checkbox value="cb" :checked="iAgree" color="rgba(51, 51, 51, 0.7)" style="transform: scale(0.6)" />
            我已阅读并同意
            <text class="link" @click="$u.route('/pages/public/agreement/index')">《用户服务协议》</text>
            和
            <text class="link" @click="$u.route('/pages/public/privacy/index')">《隐私政策》</text>
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
        },
        rules: {
          phone: [
            {
              // pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
              required: true,
              message: '请输入手机号',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            },
            {
              // 自定义验证函数
              validator: (rule, value, callback) => {
                // 返回true表示校验通过，返回false表示不通过
                return this.$u.test.mobile(value);
              },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change','blur'],
            }
          ],
          password: [
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*()]).{8,20}$/,
              required: true,
              message: '请输入8~20位密码,包含大小写字母、数字和特殊字符',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['change', 'blur']
            }
          ],
          passwordTrue: [
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*()]).{8,20}$/,
              required: true,
              message: '请确认密码',
              // 可以单个或者同时写两个触发验证方式
              trigger: ['blur']
            },
            {
              validator: (rule, value, callback) => {
                return this.form.password === this.form.passwordTrue
              },
              message: '密码不一致',
              trigger: ['change', 'blur']
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
        labelStyle: {
          color: '#494949',
          fontSize: '28rpx',
          height: '30rpx'
        }
      }
    },
    onLoad() {},
    async onShow() {
    },
    created() {},
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
      this.$refs.uForm.setRules(this.rules)
    },
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
      // 注册
      async toRegisterUser() {
        if (!this.iAgree) {
          this.$u.toast('请阅读协议!')
          return
        }

        this.$refs.uForm.validate(async (valid) => {
          if (valid) {
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
                this.$Router.pushTab({ path: '/pages/index/index' })
              }, 500)
            } else {
              this.$u.toast('验证码错误或超时,请重新获取短信验证码')
              await this.initImgCaptcha()
            }
          } else {
            console.log('验证失败');
          }
        })
      }
    }
  }
</script>

<style lang="scss">
// 登录
.login-header {
  text-align: center;
  padding: 86rpx 86rpx 168rpx;

  .login-logoimg {
    width: 524rpx;
    height: 315rpx;
    margin: 0 auto 118rpx;
  }

  .title-font {
    font-size: 48rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}

.login-button {
  margin: 0 62rpx;
  text-align: center;

  .qt-font {
    font-size: 32rpx;
    font-family: Inter-Regular, Inter;
    font-weight: 400;
    color: #333333;
    line-height: 38rpx;
    margin-top: 58rpx;
  }

  .login-wxfont {
    margin-left: 12rpx;
  }
}

// 手机验证码登录和密码登录
.sjmima-header {
  text-align: left;
  padding: 50rpx 62rpx 60rpx;
  .login-logoimg {
    width: 382rpx;
    height: 280rpx;
  }
  .title-font {
    font-size: 48rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-top: 42rpx;
    margin-left: 24rpx;
  }
}
.form-warp {
  margin: 0 62rpx;
  button[disabled] {
    color: #b2b2b2 !important;
    background: #ffffff !important;
  }
  .register-box {
    margin-top: 32rpx;
    display: flex;
    justify-content: flex-end;
    font-size: 32rpx;
    font-family: Inter-Regular, Inter;
    font-weight: 400;
    color: #3f69ff;
  }
}
.sjmima-button {
  margin: 120rpx 62rpx 0rpx;
  text-align: center;
  .qt-font {
    font-size: 32rpx;
    font-family: Inter-Regular, Inter;
    font-weight: 400;
    color: #333333;
    line-height: 38rpx;
    margin-top: 58rpx;
  }
  .login-wxfont {
    margin-left: 12rpx;
  }
}
.forget-password {
  margin-left: 40rpx;
  color: rgb(144, 147, 153);
  font-size: 28rpx;
}
.sjmima-checkbox {
  font-size: 24rpx;
  font-family: PingFang SC-Regular, PingFang SC;
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
  .link {
    color: #3f69ff;
  }
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

//隐私政策
.privacy {
  margin-top: 20rpx;
}
//切换
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
.otherLogin {
  position: fixed;
  bottom: 20rpx;
  left: 0;
  right: 0;
}

</style>
