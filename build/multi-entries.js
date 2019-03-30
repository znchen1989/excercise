const fs = require('fs')
const path = require('path')
const utils = require('./utils')
function getSpecifiedFiles(dir, ext) {
  const reg = new RegExp(`\.${ext}$`)
  return fs.readdirSync(dir).filter(file => reg.test(file))
}
function getHtmlPluginConfigList(filePath, isDev) {
  const htmlPluginOptionList = getSpecifiedFiles(filePath, 'html').map(file => {
    const fileName = file.match(/(\S+?)\.(\w+?)$/)[1]
    return {
      filename: file,
      template: path.resolve(filePath, file),
      chunks: (isDev ? ['dev-client'] : []).concat([fileName]),
      chunksSortMode: 'dependency'
    }
  })
  // console.log('-------htmlPluginOptionList', htmlPluginOptionList)
  return htmlPluginOptionList
}

function getEntryList(filePath, isDev) {
  const entryList = getSpecifiedFiles(filePath, 'js').map(file => {
    const fileName = file.match(/(\S+?)\.(\w+?)$/)[1]
    const entryFile = path.resolve(filePath, file)
    return {
      [fileName]: isDev ? ['webpack-hot-middleware/client?reload=true', entryFile] : entryFile
    }
  })
  const entryMapping = entryList.reduce(function(cfg, entry) {
    return Object.assign(cfg, entry)
  })
  if (isDev) {
    entryMapping['dev-client'] = utils.resolve('src/dev-client.js')
  }
  // console.log('-------entryMapping', entryMapping)
  return entryMapping
}

// getEntryList(utils.resolve('src/js'), true)
// getHtmlPluginConfigList(utils.resolve('src/html'))
module.exports = {
  getEntryList,
  getHtmlPluginConfigList
}
