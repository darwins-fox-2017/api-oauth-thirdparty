var passport         = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var user             = require('../models/user')
require('dotenv').config()

passport.use(new FacebookStrategy({
    clientID: process.env.App_ID_FB,
    clientSecret: process.env.FB_Secret,
    callbackURL: "http://localhost:3000/login/facebook/callback"
  },

  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    user.find ({ username: profile.displayName }, function(err, user) {
      if (err) {
        return cb(err);
      }
      if(user) {
        cb(null, user);
      } else {
        user.create({username: profile.displayName}, function(err) {
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

module.exports = FacebookStrategy
