`use strict`
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/user')
const hash = require('password-hash')
require('dotenv').config()


module.exports = function (passport) {

  passport.serializeUser(function(user, callback){
    callback(null, user)
  })

  // passport.deserializeUser(function (id, done) {
  //  User.findById(id, function (err, user) {
  //    done(err, user)
  //  })
  // })

//------------------------LocalStrategy----------------------------------------------
  passport.use('didit-login', new LocalStrategy(function(usernameInput, password, cb){

    User.findOne({ local.username: usernameInput }, function(err, data){
      if (!data) {
        cb(null, false)
      }else{
        if (hash.verify(password, data.password)) {
          cb(null, data)
        }else{
          cb(null, false)
        }
      }

    })

  }))
//-------------------------END-------------------------------------------------------

//------------------------Twitter STrategy----------------------------------------------
  passport.use(new TwitterStrategy({
    consumerKey: process.env.twitterConsumerKey,
    consumerSecret: process.env.twitterConsumerSecret,
    callbackURL: process.env.twitterCallbackURL
  },
  function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) { return done(null, user) } else {
          var newUser = new User()
          newUser.twitter.id = profile.id
          newUser.twitter.token = token
          newUser.twitter.username = profile.username
          newUser.twitter.displayName = profile.displayName

          newUser.save(function (err) {
            if (err) throw err
            return done(null, newUser)
          })
        }
      })
    })
  }
))

//------------------------Facebook Strategy----------------------------------------------
passport.use(new FacebookStrategy({
  clientID: process.env.facebookClientID,
  clientSecret: process.env.facebookClientSecret,
  callbackURL: process.env.facebookCallbackURL
},
function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
      if (err) return done(err)
      if (user) { return done(null, user) } else {
        var newUser = new User()
        newUser.facebook.id = profile.id
        newUser.facebook.token = token
        newUser.facebook.name = profile.displayName

        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  })
}
))

//------------------------GoogleStrategy----------------------------------------------
passport.use(new GoogleStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: process.env.googleCallbackURL
},
function (token, refreshToken, profile, done) {
  process.nextTick(function () {
    User.findOne({ 'google.id': profile.id }, function (err, user) {
      if (err) return done(err)
      if (user) { return done(null, user) } else {
        var newUser = new User()
        newUser.google.id = profile.id
        newUser.google.token = token
        newUser.google.email = profile.emails[0].value
        newUser.google.name = profile.displayName

        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  })
}
))
//------------------------github Strategy----------------------------------------------
passport.use(new GitHubStrategy({
  clientID: process.env.githubClientID,
  clientSecret: process.env.githubClientSecret,
  callbackURL: process.env.githubCallbackURL
},
function(token, refreshToken, profile, cb) {
  process.nextTick(function () {
  User.findOne({ githubId: profile.id }, function (err, user) {
    if (err) return done(err)
    if (user) { return done(null, user) } else {
      var newUser = new User()
      newUser.github.id = profile.id
      newUser.github.token = token
      newUser.github.displayName = profile.displayName
      newUser.github.username = profile.username

      newUser.save(function (err) {
        if (err) throw err
        return done(null, newUser)
      })
    }
  })
})
}
))

}
