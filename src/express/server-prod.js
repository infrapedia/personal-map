const express = require('express');
const app = express();
const path = require('path')
const colors = require('colors')
require('dotenv').config()

app.use(express.static(__dirname))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../../public') })
})

app.listen(3000, function() {
  console.log('\nApp listening on: ' + `${process.env.HOST_PORT}`.underline.green)
})
