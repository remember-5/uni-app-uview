<template>
  <view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log( 'home create', this.vuex_user, this.vuex_wang);
    this.$u.vuex('vuex_user', '2');
    this.$u.vuex('vuex_wang', '2');
    console.log('home set', this.vuex_user, this.vuex_wang);
  },
  methods: {},
};
</script>

<style>

</style>
