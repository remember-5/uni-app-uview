<template>
  <view>
    Test
    <u-button @click="switchLang" :throttle-time="0">{{ $t('common.language') }}</u-button>
  </view>
</template>

<script>
  export default {
    name: 'HomePage',
    data() {
      return {}
    },
    created() {},
    methods: {
      /**
       * 切换中英文
       * @param language
       */
      switchLang() {
        this.$i18n.locale = this.$i18n.locale === 'en' ? 'zh' : 'en'
        this.$u.toast(this.$t('common.switchLanguageSuccess'))
        uni.setTabBarItem({
          index: 0, // TabBar 中的索引，从 0 开始计数
          text: this.$t('tabBar.index') // 要设置的文本
        })

        uni.setTabBarItem({
          index: 1,
          text: this.$t('tabBar.home')
        })
      }
    }
  }
</script>

<style></style>
