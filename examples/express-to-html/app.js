var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var urlRecorder = require('./middleware/recorder');
var outputRouter = require('./routes/output');
var indexRouter = require('./routes/index');
var spiderRouter = require('./routes/spider');

var app = express();
app.engine('art', require('express-art-template'));
app.set('view cache', true)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', outputRouter);
app.use(urlRecorder);
app.use('/', indexRouter);
app.use('/', spiderRouter);

module.exports = app;
