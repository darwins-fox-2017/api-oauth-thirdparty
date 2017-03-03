'use strict'

const passport = require('passport')
const twitterStrategy = require('passport-twitter').Strategy
require('dotenv').config

passport.use(new twitterStrategy({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
  return done(null, profile)
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})
