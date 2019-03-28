const express = require('express')
const app = new express()
const path = require('path')
// const staticPath = path.resolve(__dirname, 'src/html')
// console.log('------staticPath', staticPath)
app.use(express.static('src/html'))
app.listen(3000, () => {
  console.log('--------listen 30000')
})
