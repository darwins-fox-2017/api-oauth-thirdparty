'use strict'

const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
require('dotenv').config()

// process.env.CLIENT_ID, process.env.CLIENT_SECRET
passport.use(new facebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  }))

passport.serializeUser((user, cb) => {
  cb(null, user)
})
