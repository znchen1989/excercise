const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.dev')
const utils = require('./utils')
const multiEntryTools = require('./multi-entries')
const entries = multiEntryTools.getEntryList(utils.resolve('src/js'))
console.log('-----entries', entries)
module.exports = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  entry: entries,
  plugins: []
})
