// req express component
var express = require('express');
var router = express.Router();

// req mongoose component
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AOuth');

var passport = require('passport');
var Strategy = require('passport-local')
    .Strategy;

// inisiasi models class setiap table
let User = require("../models/userSchema");
// require crypto untuk hash

let hash = require("../helper/hash");

/* GET home page. */
router.get('/', function (req, res) {
    User.find()
        .then(function (result) {
            res.send(result);
        });
});

// http://localhost:3000/user/new
router.post('/user/new', hash, function (req, res, next) {
    User.find()
        .then(function (result) {
            let dataUser = new User({
                dataId: result.length + 1,
                userName: req.body.userName,
                hashPassword: req.hash.hashPassword,
                salt: req.hash.salt,
            });

            dataUser.save(function (err, respond) {
                if (err) return console.error(err);
                res.send(respond)
            });
        });
});

passport.use(new Strategy(
    function (username, password, cb) {
        if (username == 'endy' && password == "bukabuka") {
            cb(null, 'user');
        }
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

router.post('/user/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.send('oke coy');
    });

// FACEBOOK
var passport = require('passport');
var FacebookStrategy = require('passport-facebook')
    .Strategy;

passport.use(new FacebookStrategy({
        clientID: "1420197958030285",
        clientSecret: "2722281df2b0f30eb6267b2d71e1e701",
        // harus sama dengan URL di facebook developer
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        failureRedirect: '/error'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        // memang kosong, & harus ada agar bisa redirect ke halaman selanjutnya
    });

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/error'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        // tampilkan data user dari facebook
        // req.user sudah bawaan default dari sana
        res.send(res.req.user);
    });

// TWITTER
// http://localhost:3000/auth/twitter
//
var session = require('express-session')
var TwitterStrategy = require('passport-twitter')
    .Strategy

passport.use(new TwitterStrategy({
        consumerKey: "2WzYNinTeyeDU0J1bN4vaHF4T",
        consumerSecret: "ScljJYetgKUN3p0NpTaGjKgLrAFzNLLMxgo1AVHfbJko1JcXnT",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }
));

// router.get('/auth/twitter',
//     passport.authenticate('twitter'));

router.get('/auth/twitter',
    passport.authenticate('twitter', {
        failureRedirect: '/error'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        // memang kosong, & harus ada agar bisa redirect ke halaman selanjutnya
    });

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.send(res.req.user);
    });

module.exports = router;
