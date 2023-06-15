<script>
  import { wxUpgrade } from '@/utils/upgrade.js'
  import { getSystemInfo } from '@/utils/device'

  export default {
    onLaunch() {
      getSystemInfo()
      // #ifdef MP-WEIXIN
      wxUpgrade()
      // #endif
    },
    onShow() {},
    methods: {}
  }
</script>

<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import 'uview-ui/index.scss';
</style>
