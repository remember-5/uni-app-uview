<template>
  <view>
    <view>其他</view>
    <u-button @click="$Router.push({ path: '/pages/test/test' })">{{ $t('index.testPage') }}</u-button>
    <upgrade-popup
      :show="upgradeOptions.popupShow"
      :update-content="upgradeOptions.upgradeContent"
      :after-show="upgradeOptions.popupAfterShow"
      :close-show="upgradeOptions.popupCloseBtnShow"
      :percent="upgradeOptions.percent"
      @close="upgradeClose"
      @updateNow="doUpdate"
    ></upgrade-popup>
  </view>
</template>

<script>
  import upgradePopup from '@/components/upgradePopup/modal-img.vue'
  import { sleep } from '@/utils/sleep'

  export default {
    name: 'IndexPage',
    components: {
      upgradePopup
    },
    data() {
      return {
        upgradeOptions: {
          downloads: '', // 下载地址
          task: null, // 下载进度监控用来做 进度展示
          popupShow: false, // 显示新版本升级
          upgradeContent: '',
          popupCloseBtnShow: false, // 显示关闭按钮
          popupAfterShow: false, // 是否显示升级加载进度条
          percent: 0, // 升级加载进度条-百分比0~100
          appleId: '' // ios app id
        }
      }
    },
    created() {
      // await this.checkUpdate()
    },
    onShow() {},
    methods: {
      /**
       * 关闭更新弹窗
       */
      upgradeClose() {
        this.upgradeOptions.popupShow = false
      },
      /**
       * 点击更新
       * @returns {Promise<void>} /
       */
      async checkUpdate() {
        // // todo 版本升级
        // if (this.vuex_version && this.vuex_version_code) {
        //   this.updateApp()
        // }
        await this.updateApp()
      },
      /**
       *  新版本升级弹窗-点击马上更新进入加载进度条
       */
      async doUpdate() {
        this.upgradeOptions.percent = 99
        this.upgradeOptions.popupAfterShow = true
        console.log(new Date())

        await sleep(3000)
        console.log(new Date())
        this.upgradeOptions.popupShow = false
        this.$u.toast('更新完成!')
        // this.installApp(this.dowAppUrl)
      },
      /**
       * 更新app
       * @returns {Promise<void>}
       */
      async updateApp() {
        // 请求接口 版本号是x.y.z 打包号是数字递增，打包号变更就热更，版本号变更，就提示去更新apk和应用商店
        // 更新类型 wgt or app
        // wgt 判断 forcibly = 强制更新 (不给关闭的按钮), solicit = 弹窗确认更新, silent = 静默更新
        // url
        // app更新就判断android iOS，android下载新的apk，iOS跳转应用商店
        // 更新说明
        // this.modalShow = true
        // this.dowAppUrl = ''
        // isnew(this).then((res) => {
        //   if (!res.data.isnew) {
        //     this.modalShow = true
        //     this.dowAppUrl = res.data.url
        //   }
        // })
      },
      // 安装app
      installApp(url) {
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
        // 暂时下载进度 下面是apk的下载
        this.upgradeOptions.popupAfterShow = true
        const dowAppTask = uni.downloadFile({
          url,
          success: (res1) => {
            if (res1.statusCode === 200) {
              console.log(res1.tempFilePath)
              plus.runtime.openFile(res1.tempFilePath)
            }
          },
          fail: (res1) => {
            console.error(res1)
            plus.nativeUI.alert('下载失败！')
          }
        })
        const that = this
        dowAppTask.onProgressUpdate((res) => {
          that.upgradeOptions.percent = res.progress
        })
      }
    }
  }
</script>

<style></style>
