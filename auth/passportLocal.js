var passport      = require('passport');
var Strategy      = require('passport-local').Strategy;
let user          = require('../models/user')
// var passwordHash  = require('password-hash');

passport.use('Isumi-Strategy', new Strategy(
  function(username, password, cb) {
    user.findOne({
      username: username
    }, function (err, user) {
      return cb(null, user);
    });

    //Password Local Statis, example:
    // if (username == 'isumi' && password == '123') {
    //   cb(null, {username: 'isumi'});
    // } else {
    //   cb('Username and password not match!')
    // }
  }
))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(id, cb) {
    if (err) { return cb(err); }
    cb(null, user);
});
