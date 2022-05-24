# uview模版项目
本项目基于uniapp-cli方式运行， `uview: 1.8.6`

## hbuliderx中运行
1. 拖入hbuliderx中后，需要右键选择"重新识别项目类型"
2. 安装依赖`npm install --registry=https://registry.npm.taobao.org`,必须使用`npm`
4. 测试发现`yarn` 和 `pnpm`可能会有编译问题，详见[https://juejin.cn/post/7077918263954374670#heading-7]()

# 新特性
- [x] rsa加解密
- [x] 增加socket
- [ ] 使用uni-simple-router https://github.com/SilurianYang/uni-simple-router
- [ ] 使用luch-request https://www.quanzhan.co/luch-request/ 
- [ ] 热更模块集成 参考https://github.com/zhouwei1994/uni-app-demo/tree/master/uni_modules/zhouWei-APPUpdate
- [ ] 微信小程序分享模块/公众号分享模块 https://github.com/zhouwei1994/uni-app-demo/tree/master/uni_modules/zhouWei-APPshare
- [ ] 增加默认页面【登录，注册，忘记密码，绑定手机号，协议页面，商品海报生成，推广海报生成】
- [ ] 续期jwt，增加request的重试机制，和404等问题转发到指定页面
- [ ] 导航栏到配置，参考 uniappDemo/#/pages/demo/navBarMemo/index
- [ ] 启动界面 manifest.json -> 'App启动界面配置' https://ask.dcloud.net.cn/article/37474
- [ ] 原生协议 https://ask.dcloud.net.cn/article/36937
