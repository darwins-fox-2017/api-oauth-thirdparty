var passport        = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;
var user            = require('../models/user')
// var user            = require('./auth/passportTwitter')
require('dotenv').config()

passport.use(new TwitterStrategy({
    consumerKey: process.env.Consumer_Key,
    consumerSecret: process.env.Application_Secret,
    callbackURL: "http://localhost:3000/login/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    user.find ({ twitterId: profile.id }, function(err, user) {
      if (err) {
        return cb(err);
      }
      if(user) {
        cb(null, user);
      } else {
        user.create({ twitterId: profile.id }, function(err) {
          if(err) {
            return cb(err)
          } else {
            cb(null, user);
          }
        })
      }
    });
  }
));
