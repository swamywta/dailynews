var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var passport = require('passport');
var authenticate = require('./routes/authenticate')(passport);
var users = require('./routes/users');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var http = require('http').Server(app);
var app = express();

//Mongoose Connection
mongoose.connect('mongodb://localhost/dailynews')
.then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// app.use(require(express-session)({
//   secret: 'crackalackin',
//   resave: true,
//   saveUninitialized: false,
//   cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
// }));
app.use(session({
  secret: '128013A7-5B9F-4CC0-BD9E-4480B2D3EFE9',
  cookie: {
        secure: true
    }

}));
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.enable('trust proxy');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/authenticate',authenticate);
var authService = require('./routes/auth-service');
authService(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
http.listen(process.env.PORT || 3000, function(){
});
module.exports = app;
