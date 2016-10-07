var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(4200, function () {
  console.log('Express App listening on port 4200!');
});