`use strict`
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const hash = require('password-hash')


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

    User.findOne({ username: usernameInput }, function(err, data){
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


}
