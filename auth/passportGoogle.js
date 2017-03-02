var passport         = require('passport');
var GoogleStrategy   = require('passport-google-oauth20').Strategy;
var user             = require('../models/user')
require('dotenv').config()

passport.use(new GoogleStrategy({
    consumerKey: process.env.ID_Client,
    consumerSecret: process.env.Client_Secret,
    clientID: process.env.ID_Client,
    clientSecret: process.env.Client_Secret,
    callbackURL: "http://localhost:3000/login/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.find ({ googleId: profile.id }, function(err, user) {
      if (err) {
        return cb(err);
      }
      if(user) {
        cb(null, user);
      } else {
        user.create({ googleId: profile.id }, function(err) {
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
