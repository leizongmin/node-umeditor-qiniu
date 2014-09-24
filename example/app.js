var express = require('express');
var UMeditor = require('../');

var editor = new UMeditor(require('./config'));

var app = express();
app.use(editor.middleware);

app.listen(8080);
