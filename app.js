var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session')

var passport = require('passport');
require('./auth/passportLocal')

var FacebookStrategy = require('passport-facebook').Strategy
require('./auth/passportFb')

var TwitterStrategy = require('passport-twitter').Strategy;
require('./auth/passportTwitter')

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('./auth/passportGoogle')

var index = require('./routes/index');
var users = require('./routes/users');
var passports = require('./routes/passports')

require('./db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(passport.initialize());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret'
}));
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', passports);

module.exports = app;
