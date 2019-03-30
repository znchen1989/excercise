const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const multiEntryTools = require('./multi-entries')
const baseWebpackConfig = require('./webpack.config.base')
const entries = multiEntryTools.getEntryList(utils.resolve('src/js'), true)
const htmlWebpackPluginList = multiEntryTools.getHtmlPluginConfigList(utils.resolve('src/html')).map(cfg => new HtmlWebpackPlugin(cfg))

module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  entry: entries,
  plugins: [new webpack.HotModuleReplacementPlugin()].concat(htmlWebpackPluginList)
})
