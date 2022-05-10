const lifeData = uni.getStorageSync('lifeData')

export const state = {
  // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
  // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
	vuex_user_info: lifeData.vuex_user_info ? lifeData.vuex_user_info : {},
	vuex_access_token: lifeData.vuex_access_token ? lifeData.vuex_access_token : '',
	vuex_refresh_token: lifeData.vuex_refresh_token ? lifeData.vuex_refresh_token : '',

	// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
	vuex_version: lifeData.vuex_version ? lifeData.vuex_version : '',
	vuex_version_code: lifeData.vuex_version_code ? lifeData.vuex_version_code : '',
	vuex_platform: lifeData.vuex_platform ? lifeData.vuex_platform : '',
	// 自定义tabbar数据
	vuex_tabbar: [],
};

export const mutations = {

};

export const actions = {

};
