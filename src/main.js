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
import Vue from 'vue'
import App from '@/App'
import { router, RouterMount } from '@/router/index.js'
import LoadingPlugin from '@/plugins/loading.js'


// eslint-disable-next-line
import Mock from '@/mock'

// // 引入并使用vue-i18n
import VueI18n from 'vue-i18n'
import uView from 'uview-ui'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js'
import English from '@/common/locales/en.js'

// 引入uView对小程序分享的mixin封装
const mpShare = require('uview-ui/libs/mixin/mpShare.js')
// 引入uView提供的对vuex的简写法文件
import vuexStore from '@/store/$u.mixin.js'
Vue.mixin(vuexStore)
Vue.mixin(mpShare)

Vue.use(router)
Vue.use(uView)
// VueI18n
Vue.use(VueI18n)
Vue.use(LoadingPlugin)
const i18n = new VueI18n({
  // 默认语言，这里的local属性，对应message中的zh、en属性
  locale: 'zh',
  // 引入语言文件
  messages: {
    // 这里的属性名是任意的，您也可以把zh设置为cn等，只是后续切换语言时
    // 要标识这里的语言属性，如：this.$i18n.locale = zh|en|zh|xxx
    zh: Chinese, // 这里为上面通过import引入的语言包
    en: English
  }
})

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n

Vue.config.productionTip = false

// 小程序页面组件和这个 App.vue 组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
App.mpType = 'app'

const app = new Vue({
  i18n,
  store,
  ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif

export default app
