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
import { RouterMount, createRouter } from 'uni-simple-router'
import permission from './permission'
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [
    ...ROUTES,
    {
      path: '*',
      redirect: (to) => {
        return { path: 'pages/404/index' }
      }
    }
  ],
  debugger: false
  // 前置路由函数 每次触发跳转前先会触发此函数，你可以在这里面做写什么。可能有、动画、记录等等操作
  // routerBeforeEach: (to, from, next) => {
  //   // console.log('***routerBeforeEach***')
  //   next()
  // }
  // // 后置路由函数 每次触发跳转后会触发此函数。
  // routerAfterEach: (to, from) => {
  //   // console.log('***routerAfterEach***')
  // }
  // 每次跳转失败时都会触发此方法并传递失败原因，详细信息如下：
  // routerErrorEach: (error, router) => {
  //   // console.log('***routerErrorEach***')
  //   // err(error, router, true)
  // }
  // detectBeforeLock: (router, to, navType) => {
  //   // console.log('***detectBeforeLock***')
  // }
  // resolveQuery: (jsonQuery) => {
  //   // console.log('***resolveQuery***')
  //   jsonQuery
  // }
  // 读取参数之前把参数传递给此函数，返回最终的数据！有此函数则不走默认方法。
  // parseQuery: (jsonQuery) => {
  //   // console.log('***parseQuery***')
  //   jsonQuery
  // }
})

permission(router)

export { router, RouterMount }
