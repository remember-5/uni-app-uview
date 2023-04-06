const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {
  // productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  transpileDependencies: ['uview-ui', 'luch-request'], // 需要babel-loader转义的第三方依赖, 指定需要编译的依赖
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath']
          })
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  }
}
