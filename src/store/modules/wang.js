const lifeData = uni.getStorageSync('lifeData')

export const state = {
  // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
  // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
  vuex_wang: lifeData.vuex_wang ? lifeData.vuex_wang : ''
}

export const mutations = {}

export const actions = {}
