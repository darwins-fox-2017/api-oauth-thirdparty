var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
// Mongoose
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/library')
require('dotenv').config()
var app = express();

// passport

let passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var oauthConfig = require('./config/oauth.js');

// Import Mongoose Models


// passport config
var User = require('./models/user');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    process.nextTick(function() {
        User.findOne({
            'local.email': email
        }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();

                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        })
    })
}));

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, done){
  User.findOne({
    'local.email': email
  }, function(err, user){
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'Gak ada user'))
    }

    if(!user.validPassword(password)){
      return done(null, false, req.flash('loginMessage', 'Password salah'))
    }

    return done(null, user)
  })
}))

passport.use(new FacebookStrategy({
        clientID: oauthConfig.facebook.clientID,
        clientSecret: oauthConfig.facebook.clientSecret,
        callbackURL: oauthConfig.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({
            'facebook.id' : profile.id
          }, function(err, user){
            if (err) {
              return done(err)
            }
            if(user){
              return done(null, user)
            } else {

              var newUser = new User()

              newUser.facebook.id = profile.id
              newUser.facebook.token = accessToken
              newUser.facebook.email = profile.emails
              newUser.facebook.name = profile.displayName

              newUser.save(function(err){
                if (err) {
                  throw err
                }

                return done(null, newUser)
              })

            }
          })
            // return done(null, profile);
        });
    }
));

passport.use(new TwitterStrategy({
  consumerKey: oauthConfig.twitter.consumerKey,
  consumerSecret: oauthConfig.twitter.consumerSecret,
  callbackURL: oauthConfig.twitter.callbackURL
}, function(token, tokenSecret, profile, done){
  process.nextTick(function(){
    User.findOne({
      'twitter.id': profile.id
    }, function(err, user){
      if (err) {
        return done(err)
      }

      if(user){
        return done(err, user)
      } else {
        let newUser = new User()
        newUser.twitter.id = profile.id
        newUser.twitter.token = token
        newUser.twitter.username = profile.username
        newUser.twitter.displayName = profile.displayName

        newUser.save(function(err){
          if (err) {
            throw err
          }

          return done(null, newUser)
        })
      }
    })
  })
}))

passport.use(new GoogleStrategy({

    clientID        : oauthConfig.google.clientID,
    clientSecret    : oauthConfig.google.clientSecret,
    callbackURL     : oauthConfig.google.callbackURL,

}, function(token, refreshToken, profile, done){
  process.nextTick(function(){
    console.log('profile', profile);
    User.findOne({
      'google.id': profile.id
    }, function(err, user){
      if (err) {
        return done(err)
      }

      if (user) {
        return done(user)
      } else {
        let newUser = new User()

        newUser.google.id = profile.id
        newUser.google.name = profile.displayName
        newUser.google.email = profile.emails[0].value
        newUser.google.token = token

        newUser.save(function(err){
          if (err) {
            throw err
          }

          return done(null, newUser)
        })
      }
    })
  })
}))

app.use(bodyParser());

app.use(cookieParser('sssshhhh'));
app.use(session({
    cookieName: 'session',
    secret: 'sssshhhh',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true,
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var customers = require('./routes/customers');
var transactions = require('./routes/transactions');
var dashboard = require('./routes/dashboard');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/books', books);
app.use('/customers', customers);
app.use('/transactions', transactions);
app.use('/dashboard', dashboard);

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

module.exports = app;
