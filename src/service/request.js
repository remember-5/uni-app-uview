/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */

import Request from 'luch-request'
import Vue from '@/main'
const getTokenStorage = () => {
  // console.log('getTokenStorage', Vue.vuex_version)
  let token = ''
  try {
    token = uni.getStorageSync('token')
  } catch (e) {
    console.log(e)
  }
  return token
}

const test = new Request()
/**
 * 修改全局配置示例
 const test = new Request({
    header: {a:1}, // 举例
    baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
    validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
        return statusCode >= 200 && statusCode < 300
    }
})
 test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

test.setConfig((config) => {
  /* 设置全局配置 */
  config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
  config.header = {
    ...config.header,
    a: 1, // 演示
    b: 2 // 演示
  }
  config.custom = {
    // auth: false, // 是否传token
    // loading: false // 是否使用loading
  }
  return config
})

test.interceptors.request.use(
  (config) => {
    /* 请求之前拦截器。可以使用async await 做异步操作  */
    config.header = {
      ...config.header,
      a: 3 // 演示
    }
    /**
     * custom {Object} - 自定义参数
     */
    // if (config.custom.auth) {
    //   config.header.token = '123456'
    // }
    // if (config.custom.loading) {
    //   uni.showLoading()
    // }
    /*
        if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
          return Promise.reject(config)
        }
        */
    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

test.interceptors.response.use(
  (response) => {
    /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.config.custom.loading) {
    //    uni.hideLoading()
    //  }
    if (response.data.code !== 200) {
      // 服务端返回的状态码不等于200，则reject()
      return Promise.reject(response)
    }
    return response
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    // if (response.config.custom.loading) {
    //    uni.hideLoading()
    //  }
    return Promise.reject(response)
  }
)

const http = new Request()
http.setConfig((config) => {
  /* 设置全局配置 */
  if (process.env.VUE_APP_MOCK === 'false') {
    config.baseURL = process.env.VUE_APP_BASE_API /* 根域名不同 */
  } else {
    console.warn('==========已开启mock==========')
  }
  config.header = {
    ...config.header,
    a: 1, // 演示
    b: 2 // 演示
  }
  return config
})

http.interceptors.request.use(
  (config) => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
      ...config.header,
      // token: getTokenStorage()
      version: Vue.vuex_version,
      versionCode: Vue.vuex_version_code,
      platform: Vue.platform,
      Authorization: `Bearer ${Vue.vuex_access_token}`
    }
    /*
       if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
         return Promise.reject(config)
       }
       */
    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  async (response) => {
    /* 请求之后拦截器。可以使用async await 做异步操作  */
    // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //   return Promise.reject(response)
    // }
    console.log('response', response)
    if (response.statusCode === 200) {
      // 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
      return response.data
    }
    if (response.statusCode === 401) {
      Vue.$u.vuex('vuex_access_token', '')
      Vue.$u.vuex('vuex_refresh_token', '')
      Vue.$u.vuex('vuex_user_info', {})
      Vue.$u.toast('登陆过期')
      Vue.$u.route({
        url: 'pages/login/login'
      })
    } else if (response.statusCode === 500) {
      if (response.data.message) {
        Vue.$u.toast(response.data.message)
      } else {
        Vue.$u.toast('请求异常')
      }
    }
    return response
  },
  (response) => {
    // 请求错误做点什么。可以使用async await 做异步操作
    console.log(response)
    return Promise.reject(response)
  }
)

export { http, test }
