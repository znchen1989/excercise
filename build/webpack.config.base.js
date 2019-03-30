const utils = require('./utils')
module.exports = {
  output: {
    filename: utils.assetsPath('js/[name].js'),
    publicPath: '/',
    path: utils.resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: utils.resolve('src/js'),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
