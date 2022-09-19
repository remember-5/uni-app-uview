<template>
  <view>
    <view>登录</view>
    <u-button @click="$u.route('/pages/login/login')">
      登录页面1
    </u-button>
    <u-button @click="$u.route('/pages/user/login')">
      登录页面2
    </u-button>
    <view>忘记密码</view>
    <u-button @click="$u.route('/pages/login/forgetPassword')">
      忘记密码1
    </u-button>
    <u-button @click="$u.route('/pages/user/forget')">
      忘记密码2
    </u-button>
    <view>其他</view>
    <u-button @click="$u.route('/pages/user/bindPhone')">
      绑定手机号
    </u-button>
    <u-button @click="$u.route('/pages/user/protocol')">
      协议
    </u-button>
    <u-button @click="$u.route('/pages/user/register')">
      注册
    </u-button>
    <u-button @click="$u.route('/pages/pdf/pdf')">
      pdf预览
    </u-button>
    <view>{{ $t('common.intro') }}</view>
    <u-rate
      v-model="value"
      :count="count"
    />
  </view>
</template>

<script>
// import { login } from '@/api/user.js'
import { isnew } from '@/api/version'

export default {
  components: {},
  data() {
    return {
      dowAppUrl: '', // 下载地址
      dowAppTask: null, // 下载进度监控用来做 进度展示
      modalShow: false, // 显示新版本升级
      afterShow: false, // 是否显示升级加载进度条
      percent: 0, // 升级加载进度条-百分比0~100
      appleId: '', // ios app id
      count: 4,
      value: 2
    }
  },
  async created() {
    this.cickUpdata()

    console.log('index create', this.vuex_user, this.vuex_wang)
    this.$u.vuex('vuex_user', '1')
    this.$u.vuex('vuex_wang', '1')
    console.log('index set', this.vuex_user, this.vuex_wang)
    // console.log("created");
    // await login(this).then(e=>{
    // 	console.log(e);
    // 	console.log("login")
    // })
    // console.log("logined");
  },
  methods: {
    cickUpdata() {
      // todo 版本升级
      if (this.vuex_version && this.vuex_version_code) {
        this.updataapp()
      }
    },
    // 新版本升级弹窗-点击马上更新进入加载进度条
    updateNowBtn() {
      this.installapp(this.dowAppUrl)
    },

    updataapp() {
      isnew(this).then((res) => {
        if (!res.data.isnew) {
          this.modalShow = true
          this.dowAppUrl = res.data.url
        }
      })
    },
    installapp(url) {
      if (this.vuex_platform === 'ios') {
        uni.request({
          url: `https://itunes.apple.com/cn/lookup?id=${this.appleId}`,
          success: (e) => {
            console.log(e.data.results[0].version)
            const tiao = `itms-apps://itunes.apple.com/app/${this.appleId}`
            plus.runtime.openURL(tiao)
          },
          fail: (err) => {
            console.log(err)
          },
          complete: () => {}
        })
        return
      }
      this.afterShow = true
      const dowAppTask = uni.downloadFile({
        url,
        success: (res1) => {
          if (res1.statusCode === 200) {
            console.log(res1.tempFilePath)
            plus.runtime.openFile(res1.tempFilePath)
          }
        },
        fail: (res1) => {
          plus.nativeUI.alert('下载失败！')
        }
      })
      const that = this
      dowAppTask.onProgressUpdate((res) => {
        that.percent = res.progress
      })
    }
  }
}
</script>

<style>

</style>
