const webpackHotMiddlewareClient = require('webpack-hot-middleware/client?reload=true')
webpackHotMiddlewareClient.subscribe(function(message) {
  console.log('------recieve message', message)
  if (message.action === 'reload') {
    window.location.reload()
  }
})
