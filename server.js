var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

console.log(__dirname + 'public');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public', '/views', 'index.html'));
});

app.listen(3000, function (req, res) {
  console.log('Now listening on port 3000.');
  console.log('Go to localhost:3000 to see site.');
  console.log('Ctrl+C shuts down server.');
});
