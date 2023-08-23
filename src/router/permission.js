/**
 * Copyright [2022] [remember5]
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import store from '@/store'

export default (router) => {
  // 路由白名单，可以考虑不同环境配置不同白名单
  const whiteList = [
    '/pages/index/index',
    '/pages/index/home',

    '/pages/test/mock',
    '/pages/test/test',
    '/pages/test/upload',

    '/pages/public/404',
    '/pages/public/webview',
    '/pages/public/pdf',

    '/pages/public/login',
    '/pages/public/wxauth',
    '/pages/public/register',
    '/pages/public/forgotPassword'
  ] // no redirect whitelist

  // 全局路由前置守卫
  router.beforeEach(async (to, from, next) => {
    // console.log('router.beforeEach.to', to)
    // console.log('router.beforeEach.from', from)

    const token = store.state.vuex_access_token
    const userId = store.state.vuex_user_info

    if (token) {
      if (to.path === '/pages/public/login') {
        next()
      } else if (!userId) {
        try {
          // await store.dispatch('user/getUserData')
          next()
        } catch (error) {
          // await store.dispatch('user/logout')
          next({
            path: '/pages/public/index',
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
        path: '/pages/public/login',
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
  // eslint-disable-next-line
  router.afterEach((to, from) => {
    // console.log('router.afterEach.to', to)
    // console.log('router.afterEach.from', from)
  })
}
