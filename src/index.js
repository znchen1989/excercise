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
app.use(hotMiddleWare(compiler))

// app.use(express.static(staticPath))
app.listen(3000, () => {
  console.log('--------listen 30000')
})
