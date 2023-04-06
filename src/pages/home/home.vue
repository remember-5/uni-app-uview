<template>
  <view> Test </view>
</template>

<script>
  import { getGoodsList, getGoodsInfo } from '@/service/api.js'
  export default {
    name: 'HomePage',
    data() {
      return {}
    },
    created() {
      this.globalGetData()
      console.log('home create', this.vuex_user, this.vuex_wang)
      this.$u.vuex('vuex_user', '21')
      this.$u.vuex('vuex_wang', '2')
      console.log('home set', this.vuex_user, this.vuex_wang)
    },
    methods: {
      async globalGetData() {
        let id = Math.random() > 0.5 ? Date.now() : undefined
        const res = await getGoodsInfo(
          { id: id },
          {
            username: 'luch',
            email: Date.now() + '-------webwork.s@qq.com',
            address: Date.now() + '-------https://quanzhan.co'
          }
        )
        console.log(res, '------------')
        // getGoodsInfo(
        //   { id: id },
        //   {
        //     username: 'luch',
        //     email: Date.now() + '-------webwork.s@qq.com',
        //     address: Date.now() + '-------https://quanzhan.co'
        //   }
        // )
        //   .then((res) => {
        //     console.log('更新用户信息 post success----期望custom 含有custom: 66')
        //     console.log(res)
        //   })
        //   .catch((err) => {
        //     console.log('更新用户信息 post fail----')
        //     console.log(err)
        //   })

        getGoodsList()
          .then((res) => {
            console.log('获取用户列表 get success----')
            console.log(res)
          })
          .catch((err) => {
            console.log('获取用户列表 get fail----')
            console.log(err)
          })
      }
    }
  }
</script>

<style></style>
