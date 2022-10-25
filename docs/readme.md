> 对接中小企助查 `web-view` 适配个性化分享

## 背景
现在只支持监听web-view url跳转变化，例如：www.baidu.com 跳转 www.taobao.com 是支持监听

www.baidu.com 跳转 www.baidu.com/s?saaa 不再支持监听

## 代码改造
`test.html` 是demo代码，基于vue实现

1. cdn 方式引入js `<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>`
在单页面具体使用如下，`url` 是当前页面**绝对地址**(公网访问地址)：
```javascript
mounted(){
    document.addEventListener('UniAppJSBridgeReady', function() {
        uni.getEnv(function(res) {
            console.log('当前环境：' + JSON.stringify(res));
        });
        uni.postMessage({
            data: {
                action: 'postMessage',
                url: "http://192.168.123.236:8080/test.html"
            }
        });
    });
} 

```

3. vue脚手架，npm 方式需要自行下载，并引入到项目中
在`main.js`引入
```javascript
import * as uni from './utils/uni.webview.1.5.2.js.js'  

document.addEventListener("UniAppJSBridgeReady", function() {  
    Vue.prototype.myUni = uni  
});
```
使用方式如下，`url` 是当前页面**绝对地址**(公网访问地址)
```javascript
  sendMessage1() {     
      this.myUni.postMessage({
          data: {
              action: 'postMessage',
              url: "http://192.168.123.236:8080/test.html"
          } 
      });  
    },  
    sendMessage2() {  
      this.myUni.webView.postMessage({
          data: {
              action: 'postMessage',
              url: "http://192.168.123.236:8080/test.html"
          }  
      });  
    },

```
3. 完成以上配置，app即可接管分享






