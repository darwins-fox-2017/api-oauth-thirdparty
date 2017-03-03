'use strict'

// INITIAL PASSPORT & PASSPORT-LOCAL
const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
const models = require('../models')

passport.use(new passportStrategy(
  (username, password, cb) => {
    models.User.findOne({
      username: username,
      password: password
    }, (err, user) => {
      if (err) { return cb(err) }
      if (!user) { return cb(null, false) }
      if (user.password != password) { return cb(null, false) }
      return cb(null, user)
    })
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
