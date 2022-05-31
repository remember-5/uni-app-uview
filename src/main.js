import Vue from 'vue';
import App from './App';

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

import { router, RouterMount } from '@/router';

import plugins from '@/plugins';

import directives from '@/directives';

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js';
import English from '@/common/locales/en.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';

Vue.config.productionTip = false;

App.mpType = 'app';

// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红';

Vue.use(router);
Vue.use(plugins);
Vue.use(directives);

// 引入uView对小程序分享的mixin封装
const mpShare = require('uview-ui/libs/mixin/mpShare.js');

// 引入uView提供的对vuex的简写法文件
const vuexStore = require('@/store/$u.mixin.js');

Vue.mixin(vuexStore);

Vue.mixin(mpShare);

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
  // 默认语言
  locale: 'zh',
  // 引入语言文件
  messages: {
    zh: Chinese,
    en: English,
  },
});

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n;

const app = new Vue({
  i18n,
  store,
  ...App,
});
Vue.use(httpInterceptor, app);

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// todo 如果编译有问题，就来试试改这

// #ifndef H5
app.$mount(); // 为了兼容小程序及app端必须这样写才有效果
// #endif
