const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var GitHubStrategy = require('passport-github').Strategy;

const jwt = require('jsonwebtoken');

let User = require('./models/user');



passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if(err) {done(err)}
      if(!user) {done("User not found")}
      if(password !== user.password) {
        done("Wrong password")
      }
      let token = jwt.sign({user: user}, 'ThisShitisFuckingToken')
      done(null, user)
    })
  }
))

passport.use(new FacebookStrategy({
  clientID: '190233801464815',
    clientSecret: '2fed281ec8d8b6aba6a06b9d771a4c60',
    callbackURL: "http://localhost:3000/login/facebook",
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOne({ username: profile.displayName }, function (err, user) {
      if(err) {
        cb(err)
      }
      if(user) {
        cb(null, "User already have access")
      }
      User.create({username: profile.displayName}, function(err) {
        if(err) {
          cb(err)
        }
        cb(null, "Success create user")
      })
    });
  }
))

passport.use(new TwitterStrategy({
    consumerKey: 'J4ZwEVtil3OJeDAGfJaPiBfue',
    consumerSecret: 'LymPrw6MzHq0gK5Q1eWxa6NCUF18I6pGrVrqFKUlSOSIWcOCXE',
    callbackURL: "http://localhost:3000/login/twitter"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOne({ username: profile.username }, function (err, user) {
      if(err) {
        cb(err)
      }
      if(user) {
        cb(null, "User already have access")
      }
      User.create({username: profile.username}, function(err) {
        if(err) {
          cb(err)
        }
        cb(null, "Success create user")
      })
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: '117416411129-hkhd9phcp59vnvdfba6vv7dq17fbv459.apps.googleusercontent.com',
    clientSecret: 'Pf4134WeGZZG9Qm4Phq6kw6C',
    callbackURL: "http://localhost:3000/login/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOne({ username: profile.emails.value }, function (err, user) {
      if(err) {
        cb(err)
      }
      if(user) {
        cb(null, "User already have access")
      }
      User.create({username: profile.emails.value}, function(err) {
        if(err) {
          cb(err)
        }
        cb(null, "Success create user")
      })
    });
  }
));

passport.use(new GitHubStrategy({
    clientID: 'f67835b8b07f702a952e',
    clientSecret: '13064e087deca7771a2261afd42617ef0e411eb3',
    callbackURL: "http://localhost:3000/login/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ username: profile.blog }, function (err, user) {
      if(err) {
        cb(err)
      }
      if(user) {
        cb(null, "User already have access")
      }
      User.create({username: profile.blog }, function(err) {
        if(err) {
          cb(err)
        }
        cb(null, "Success create user")
      })
    });
  }
));



passport.serializeUser(function(user, cb) {
  cb(null, user);
});
