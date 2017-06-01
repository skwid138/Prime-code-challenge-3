/** ---- DO NOT MODIFY THIS FILE ---- **/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var treats = require('./routes/treats');

app.use(express.static('assignment/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/treats', treats);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public', '/views', 'index.html'));
});

var server = app.listen(3000, function (req, res) {
  console.log('Now listening on port 3000.');
  console.log('Go to localhost:3000 to see site.');
  console.log('Ctrl+C shuts down server.');
});

module.exports = server;
