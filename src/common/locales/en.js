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
    desc: 'Numerous components cover the various requirements of the development process, and the components are rich in functions and compatible with multiple terminals. Let you integrate quickly, out of the box'
  },
  js: {
    desc: 'Numerous intimate gadgets are a weapon that you can call upon during the development process, allowing you to dart in your hand and pierce the Yang with a hundred steps'
  },
  template: {
    desc: 'Collection of many commonly used pages and layouts, reducing the repetitive work of developers, allowing you to focus on logic and get twice the result with half the effort'
  },
  nav: {
    components: 'Components',
    js: 'JS',
    template: 'Template'
  },
  common: {
    intro: 'UI framework for rapid development of multiple platforms',
    title: 'uView UI',
    language: '切换为中文',
    switchLanguageSuccess: 'Switch English Success',
    welcome: 'Welcome!',
    forget: 'Forget Password',
    register: 'Register',
    login: 'Login'
  },
  tabBar: {
    index: 'index',
    home: 'home'
  },
  index: {
    testPage: 'TestPage'
  },
  login: {
    wxLogin: 'Wechat Login',
    otherLogin: 'Other Login',
    wx: 'Wechat Login',
    account: 'Account Login',
    sms: 'Sms Login',
    form: {
      phone: {
        label: 'Phone：',
        placeholder: 'Please input phone'
      },
      password: {
        label: 'Password：',
        placeholder: 'Please input password'
      },
      captcha: {
        label: 'Captcha：',
        placeholder: 'Please input captcha'
      },
      smsCode: {
        label: 'Sms Code：',
        placeholder: 'Please input Sms Code'
      },
      passwordTrue: {
        label: 'Check Password：',
        placeholder: 'Please input Password'
      }
    }
  },
  test: {
    uploadPage: 'Upload Page',
    mockPage: 'Mock Page',
    canvasPage: 'Canvas Page',
    echartsPage: 'Echarts Page',
    pdfPage: 'PDF Page',
    webviewPage: 'Webview Page',
    homePage: 'Home Page',
    loginPage: 'Login Page',
    authPage: 'Auth Page'
  }
}
