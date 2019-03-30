const path = require('path')
function resolve(dirPath) {
  return path.resolve(__dirname, `../${dirPath}`)
}

function assetsPath(filename) {
  return path.posix.join('bundle/', filename)
}

module.exports = {
  resolve,
  assetsPath
}
