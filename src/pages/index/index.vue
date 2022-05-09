<template>
	<view>
		<view>登录</view>
		<u-button @tap="$u.route('/pages/login/login')">登录页面1</u-button>
		<u-button @tap="$u.route('/pages/user/login')">登录页面2</u-button>
		<view>忘记密码</view>
		<u-button @tap="$u.route('/pages/login/forgetPassword')">忘记密码1</u-button>
		<u-button @tap="$u.route('/pages/user/forget')">忘记密码2</u-button>
		<view>其他</view>
		<u-button @tap="$u.route('/pages/user/bindPhone')">绑定手机号</u-button>
		<u-button @tap="$u.route('/pages/user/protocol')">协议</u-button>
		<u-button @tap="$u.route('/pages/user/register')">注册</u-button>
	</view>
</template>

<script>
	import {login} from "@/api/user.js"
	export default {
		components: {},
		data() {
			return {

			}
		},
		async created() {
				console.log('index create',this.vuex_user,this.vuex_wang);
				this.$u.vuex('vuex_user', '1');
				this.$u.vuex('vuex_wang', '1');
				console.log('index set',this.vuex_user,this.vuex_wang);
				// console.log("created");
				// await login(this).then(e=>{
				// 	console.log(e);
				// 	console.log("login")
				// })
				// console.log("logined");
		},
		methods: {

		}
	}
</script>

<style>

</style>
