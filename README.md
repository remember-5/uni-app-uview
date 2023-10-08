# 介绍

基于`uniapp`框架`cli`方式运行， ui 使用`uview: 1.8.8`

`terminal`运行 npm, 国内建议改为 `taobao` 源

```shell
npm config set registry http://registry.npmmirror.com
npm i && npm run serve
```

`hbuliderx` 中运行问题

1. 拖入 hbuliderx 中后，需要右键选择"重新识别项目类型"

`webstorm`中运行问题

1. rpx 插件`wechat-mini-program-support`,开启微信小程序的支持,在设置里面配置 wechat... 点击开启

# 新特性

- [x] vs code 不支持一件格式化的问题(eslint 问题)
- [x] i18n 集成
- [x] http 全部使用 async await
- [x] 热更新提示&热更的改造
- [x] 改造登录页面和套餐页面为模版
- [x] 增加 mock(暂不支持app) https://github.com/lavyun/better-mock
- [ ] husky
- [x] rsa 加解密
- [ ] 增加 socket
- [x] 使用 uni-simple-router https://github.com/SilurianYang/uni-simple-router
- [x] 使用 luch-request https://www.quanzhan.co/luch-request/
- [x] 热更模块集成 参考 https://github.com/zhouwei1994/uni-app-demo/tree/master/uni_modules/zhouWei-APPUpdate
- [ ] 
  微信小程序分享模块/公众号分享模块 https://github.com/zhouwei1994/uni-app-demo/tree/master/uni_modules/zhouWei-APPshare
- [x] 增加默认页面【登录，注册，忘记密码，绑定手机号，协议页面，商品海报生成，推广海报生成】
- [ ] 续期 jwt，增加 request 的重试机制，和 404 等问题转发到指定页面
- [ ] 导航栏到配置，参考 uniappDemo/#/pages/demo/navBarMemo/index
- [ ] 启动界面 manifest.json -> 'App 启动界面配置' https://ask.dcloud.net.cn/article/37474
- [ ] 原生协议 https://ask.dcloud.net.cn/article/36937
- [x] lodash-es 一致性、模块化、高性能的 JavaScript 实用工具库 https://www.lodashjs.com/
- [x] qs URL 解析成对象 https://juejin.cn/post/7125723650627469319

```js
import Qs from 'qs'

let url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0'
Qs.parse(url)
console.log(Qs.parse(url))
```

# 使用说明

## 普通项目改造成 cli 项目

参考官网的教程 https://uniapp.dcloud.net.cn/quickstart-cli.html

## 组件开发注意事项

1. 在`<view></view>` 标签中点击事件需要使用 `@tap`
2. 在`<u-button></u-button>` 标签中点击事件需要使用 `@click`
3. 子组件向父组件传入值或调用事件必须使用`this.$emit('xxxx')` 其中 `xxxx` 在父组件中用 `@xxxx`
4. 路由跳转如下代码，其中`path` 必须是以`/`开头，如`/pages/index/index`,否则报错

```javascript
// 路由跳转
this.$Router.push({ path: url, query: { name: 'wang' } })
// 在onLoad中使用this.$Route.query获取参数
```

5. `pages.json` 条件编译注意事项

```javascript
// #ifdef APP-PLUS
{
  "path"
:
  "pages/signature/index",
    "style"
:
  {
    "navigationBarTitleText"
  :
    "手写板",
      "enablePullDownRefresh"
  :
    false
  }
}
// !!!!注意这里，上面的括号后不可以有 `,` 否则会报错!!!!
// #endif
// #ifdef H5
{
  "path"
:
  "pages/h5/jump",
    "style"
:
  {
    "navigationStyle"
  :
    "custom",
      "navigationBarTitleText"
  :
    "上海电信翼企购"
  }
}
// #endif

``` 

6. 分包加载静态资源路径,可在每个分包下创建static路径  https://juejin.cn/post/7167197165960298527

```html

<image src="/分包名称/static/images/bg-black.png"></image>
<image src="/pageA/static/images/bg-black.png"></image>
```

## 预览 pdf

目前最高支持版本`pdfjs-2.6.347`  
下载 pdf 插件 http://mozilla.github.io/pdf.js/getting_started/ 并解压得到`build` `web` 两个文件夹  
在 uniapp 的 src 下创建路径 `hybrid/html/pdf` ，并放入 `build` `web` 两个文件夹  
pdf.js 不支持跨域请求 https://blog.csdn.net/xinlingdexueba/article/details/79555678

`file origin does not match viewer’s，`

注释 viewer.js 的代码：

```javascript
//    if (fileOrigin !== viewerOrigin) {
//      throw new Error('file origin does not match viewer\'s');
//    }
```

创建 preview-pdf.vue，参考https://github.com/Eveveen/uni-app-pdf

```vue

<template>
  <view class="content">
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // pdf.js的viewer.htm所在路径
        // 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
        viewerUrl: '/hybrid/html/pdf/web/viewer.html',
        // 要访问的pdf的路径
        fileUrl: '',
        // 最终显示在web-view中的路径
        url: ''
      }
    },
    onLoad(options) {
      const link = decodeURIComponent(options.link)
      // const link = decodeURIComponent('https://oss.bj-gly-zgdx-bzx-icp.caiicloudoss.com/smeapp/b8b18e7e-2623-4ffd-b102-59ec914ac44f.pdf');
      // h5，使用h5访问的时候记得跨域
      // #ifdef H5
      this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      // #endif

      // 在安卓和ios手机上
      // 判断是手机系统：安卓，使用pdf.js
      // #ifdef APP-PLUS
      if (plus.os.name === 'Android') {
        this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      }
      // ios，直接访问pdf所在路径
      else {
        // 直接用在iOS15.4.1不生效
        // this.url = encodeURIComponent(link);
        this.url = `${this.viewerUrl}?file=${encodeURIComponent(link)}`
      }
      // #endif
    },
    methods: {}
  }
</script>

<style></style>
```

使用跳转就可以预览了

```javascript
const _link = encodeURIComponent('https://oss.bj-gly-zgdx-bzx-icp.caiicloudoss.com/smeapp/b8b18e7e-2623-4ffd-b102-59ec914ac44f.pdf')
this.$u.route({
  url: 'pages/home/pdf/preview-pdf.vue',
  params: {
    link: _link
  }
})
```

## 热更方案

待完善

使用插件 [https://excalidraw.com/](https://excalidraw.com/) 打开`docs/app-upgrade.excalidraw`

## 使用 less(不建议使用)

添加以下依赖,

```json lines
{
  "less": "^4.0.0",
  "less-loader": "^5.0.0"
}
```

## pnpm 使用(不建议使用)

测试发现`pnpm`可能会有编译问题，详见 https://juejin.cn/post/7077918263954374670#heading-7

pnpm 可能会造成打包无法使用的情况，所以还是老老实实用 npm 吧

如果出现以下代码

```text
├─┬ @dcloudio/uni-automator
│ ├── ✕ missing peer adbkit@^2.11.1
│ ├── ✕ missing peer jimp@^0.10.1
│ ├── ✕ missing peer node-simctl@^6.1.0
│ └── ✕ missing peer puppeteer@^3.0.1
├─┬ @dcloudio/vue-cli-plugin-uni
│ └─┬ copy-webpack-plugin
│   └── ✕ missing peer webpack@"^4.0.0 || ^5.0.0"
├─┬ sass-loader
│ └── ✕ missing peer webpack@"^4.36.0 || ^5.0.0"
├─┬ @dcloudio/uni-quickapp-native
│ └─┬ @hap-toolkit/dsl-vue
│   ├─┬ css-loader
│   │ └── ✕ missing peer webpack@^4.0.0
│   ├─┬ mini-css-extract-plugin
│   │ └── ✕ missing peer webpack@^4.4.0
│   ├─┬ url-loader
│   │ └── ✕ missing peer webpack@^4.0.0
│   └─┬ vue-loader
│     └── ✕ missing peer webpack@"^3.0.0 || ^4.1.0 || ^5.0.0-0"
```

在`package.json`中加入以下代码, 官方文档 https://pnpm.io/zh/package_json#pnpmpeerdependencyrulesallowedversions

```json
"pnpm": {
"peerDependencyRules": {
"ignoreMissing": ["adbkit", "jimp", "node-simctl", "puppeteer", "webpack"],
}
}
```

出现以下代码

```text
└─┬ @vue/cli-service
  └─┬ vue-loader
    └── ✕ unmet peer vue@^3.2.13: found 2.6.14
```

在`package.json`中加入以下代码，官方文档 https://pnpm.io/zh/package_json#pnpmneverbuiltdependencies

```json
"pnpm": {
"peerDependencyRules": {
"allowedVersions": {
"vue": "2.6.14"
}
}
}
```

# 打包

## 不同平台打包

`package.json`中的`scripts`为所有命令，命令定义为`${env}:${platform}`, 即(环境:平台)  
`${env}`中`dev`前缀的是开发环境的命令,`build`为生产打包命令  
`${platform}`请参考官方文档 https://zh.uniapp.dcloud.io/worktile/CLI.html

## 不同环境打包

如有多个环境，可以在根目录创建 `.env.xxx` 文件，其中`xxx`用来区分环境  
在启动命令后添加`--mode ${env}`即可，例如, 创建`.env.test`为`test`环境的变量，h5 启动命令`dev:h5`中加入`--mode test`

## docker 打包

在本地执行相关的命令，修改`Dockerfile`中的`COPY`命令即可(默认为 h5)

# eslint

git 上传的时候格式化

```json
  "husky": {
"hooks": {
"pre-commit": "lint-staged"
}
},
"lint-staged": {
"src/**/*.{js,vue}": [
"eslint --fix",
"git add"
]
}

```

整个文件范围内禁止规则出现警告, 将/_ eslint-disable _/放置于文件最顶部

```javascript
/* eslint-disable */
alert('foo')
```

在文件中临时禁止规则出现警告, 将需要忽略的代码块用注释包裹起来

```javascript
/* eslint-disable */
alert('foo')
/* eslint-enable */
```

对指定规则的启用或者禁用警告, 将需要忽略的代码块用注释包裹起来

```javascript
/* eslint-disable no-alert, no-console */
alert('foo')
console.log('bar')
/* eslint-enable no-alert, no-console */
```

对指定行禁用规则警告, 此方法，有两种形式，参见下方。

```javascript
alert('foo') // eslint-disable-line

// eslint-disable-next-line
alert('foo')
```

在指定行上禁用指定的某个规则

```javascript
alert('foo') // eslint-disable-line no-alert

// eslint-disable-next-line no-alert
alert('foo')
```

在某个特定的行上禁用多个规则

```javascript
alert('foo') // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo')
```

# 不错的插件

- 模版 https://ext.dcloud.net.cn/plugin?id=2009
- 炫酷的样式、炫酷的动画效果 https://ext.dcloud.net.cn/plugin?id=3685
- mp-html 富文本组件【全端支持，可编辑】 https://ext.dcloud.net.cn/plugin?id=805
- 秋云 ucharts echarts 高性能跨全端图表组件 https://ext.dcloud.net.cn/plugin?id=271
- luch-request https://ext.dcloud.net.cn/plugin?id=392
- 海报画板 https://ext.dcloud.net.cn/plugin?id=2389
- 路由、拦截、最优雅解决方案 uni-simple-router https://ext.dcloud.net.cn/plugin?id=578
- 下拉式筛选菜单 https://ext.dcloud.net.cn/plugin?id=1078
- tree 树组件 https://ext.dcloud.net.cn/plugin?id=1000
- lucky-canvas【大转盘｜九宫格｜老虎机】抽奖插件 https://ext.dcloud.net.cn/plugin?id=3499
- APP 版本更新、强制更新、静默更新、下载进度（wgt 更新） https://ext.dcloud.net.cn/plugin?id=1643
- app 版本升级原生弹框和进度提示(包含 wgt 升级) https://ext.dcloud.net.cn/plugin?id=1371
- 升级中心 uni-upgrade-center - App https://ext.dcloud.net.cn/plugin?id=4542
- 前端铺子（小程序+H5+公众号+App）多种移动端开发实用模版、功能、样式 https://ext.dcloud.net.cn/plugin?id=5013
- 拖动排序列表 HM-dragSorts https://ext.dcloud.net.cn/plugin?id=1372
- 开箱即用的公共搜索组件（历史记录，app 语音输入，搜索推荐） https://ext.dcloud.net.cn/plugin?id=512
- 百度图表 echarts https://ext.dcloud.net.cn/plugin?id=4899
- 蚂蚁图表 antv F2 https://ext.dcloud.net.cn/plugin?id=4613



