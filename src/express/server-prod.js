const express = require('express');
const app = express();
const path = require('path')
// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const port = process.env.PORT || 8000 || 8081 || 8082
const HOST_PORT = process.env.HOST + ':' + port
require('dotenv').config()


console.log(process.env.HOST + ':' + process.env.PORT)

app.use(express.static(__dirname))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../public') })
})

app.listen(port, function() {
  console.log('\nApp listening on: ' + `${HOST_PORT}`.underline.green)
})
