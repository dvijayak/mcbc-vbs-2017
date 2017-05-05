var express = require('express');
var path = require('path');

/// Let's begin

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// var favicon = require('serve-favicon');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

/// Cookies and Sessions

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({
   secret: 'b0nf1y4h'
   , resave: false
   , saveUninitialized: false
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
var flash = require('connect-flash');
app.use(flash());

/// Routes

// Data analysis backend
var login = require('./routes/login');
app.use('/login', login);
var logout = require('./routes/logout');
app.use('/logout', logout);
var admin = require('./routes/admin');
app.use('/admin', admin);

// Serve the main angular frontend
app.use(express.static(path.join(__dirname, './ui/dist')));
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './ui/dist/index.html'));
});


/// Catch-alls

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
