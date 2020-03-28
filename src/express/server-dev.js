const express = require('express');
const app = express();
const path = require('path')
// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('../../webpack.dev.config.js')
const compiler = webpack(config)
const webpackHotMiddleware = require('webpack-hot-middleware')
const HTML_FILE = path.join(__dirname, 'index.html')
require('dotenv').config()

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(3000, function() {
  console.log('\nApp listening on: ' + `${process.env.HOST_PORT}`.underline.green)
})
