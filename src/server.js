const express = require('express')
const app = new express()
const devMiddleWare = require('webpack-dev-middleware')
const hotMiddleWare = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config.dev')
const compiler = webpack(webpackConfig)
app.use(
  devMiddleWare(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
)
const hotMiddleWareInstance = hotMiddleWare(compiler)
app.use(hotMiddleWareInstance)

compiler.hooks.compilation.tap('MyPlugin', function(compilation) {
  compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', function(htmlData, callback) {
    hotMiddleWareInstance.publish({ action: 'reload' })
    console.log('--------reload')
    callback()
  })
})
app.listen(3000, () => {
  console.log('--------listen 30000')
})
