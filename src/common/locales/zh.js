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
export default {
  // 可以以页面为单位来写，比如首页的内容，写在index字段，个人中心写在center，共同部分写在common部分
  components: {
    desc: '众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让你快速集成，开箱即用'
  },
  js: {
    desc: '众多的贴心小工具，是你开发过程中召之即来的利器，让你飞镖在手，百步穿杨'
  },
  template: {
    desc: '收集众多的常用页面和布局，减少开发者的重复工作，让你专注逻辑，事半功倍'
  },
  nav: {
    components: '组件',
    js: '工具',
    template: '模板'
  },
  common: {
    intro: '多平台快速开发的UI框架',
    title: 'uView UI',
    language: 'Switch English',
    switchLanguageSuccess: '切换为中文成功',
    welcome: '欢迎使用!',
    forget: '忘记密码',
    register: '注册账号',
    login: '登录'
  },
  tabBar: {
    index: '首页',
    home: '我的'
  },
  index: {
    testPage: '测试页面'
  },
  login: {
    wxLogin: '微信用户一键登录',
    otherLogin: '其他登陆方式',
    wx: '微信登陆',
    account: '账户登录',
    sms: '短信验证',
    form: {
      phone: {
        label: '手机号：',
        placeholder: '请输入手机号'
      },
      password: {
        label: '密码：',
        placeholder: '请输入密码'
      },
      captcha: {
        label: '验证码：',
        placeholder: '请输入验证码'
      },
      smsCode: {
        label: '短信验证码：',
        placeholder: '请输入短信验证码'
      },
      passwordTrue: {
        label: '确认密码：',
        placeholder: '请确认密码'
      }
    }
  },
  test: {
    uploadPage: '上传页面',
    mockPage: 'Mock页面',
    canvasPage: 'Canvas页面',
    echartsPage: 'Echarts页面',
    pdfPage: 'pdf页面',
    webviewPage: 'webview页面',
    homePage: 'Home页面',
    loginPage: '登录页面',
    authPage: '授权页面'
  }
}
