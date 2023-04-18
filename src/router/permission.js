import store from '@/store'

export default (router) => {
  // 路由白名单，可以考虑不同环境配置不同白名单
  const whiteList = [
    '/pages/index/index',
    '/pages/home/home',
    '/pages/404/index',
    '/pages/webview/webview',
    '/pages/index/upload',
    '/pages/index/mock',
    '/pages/pdf/pdf',
    '/pages/login/login',
    '/pages/login/wxauth',
    '/pages/login/register',
    '/pages/login/forgotPassword'
  ] // no redirect whitelist

  // 全局路由前置守卫
  router.beforeEach(async (to, from, next) => {
    // console.log('router.beforeEach.to', to)
    // console.log('router.beforeEach.from', from)

    const token = store.state.vuex_access_token
    const userId = store.state.vuex_user_info

    if (token) {
      if (to.path === '/pages/login/login') {
        next()
      } else if (!userId) {
        try {
          // await store.dispatch('user/getUserData')
          next()
        } catch (error) {
          // await store.dispatch('user/logout')
          next({
            path: '/pages/login/index',
            query: {
              redirect: JSON.stringify({
                path: to.path,
                query: to.query
              })
            }
          })
        }
      } else {
        next()
      }
    } else if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/pages/account/login/index',
        query: {
          redirectView: JSON.stringify({
            path: to.path,
            query: to.query
          })
        }
      })
    }
  })

  // 全局路由后置守卫
  router.afterEach((to, from) => {
    // console.log('router.afterEach.to', to)
    // console.log('router.afterEach.from', from)
  })
}
