var express = require('express');
var path = require('path');
var app = express();

//app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, '../')));
// app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../build/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})