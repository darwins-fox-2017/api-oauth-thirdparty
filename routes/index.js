var express = require('express');
var router = express.Router();

var passport = require('passport');
var Account = require('../models/account');

router.get('/register', function(req, res, next) {
    res.render('auth/register')
})

router.post('/register', function(req, res, next) {
    Account.register(new Account({
        username: req.body.username
    }), req.body.password, function(err, account) {
        console.log('account : ', account);
        if (err) {
            return res.render('auth/register', {
                account: account
            });
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/dashboard');
        });
    });
})

router.get('/login', function(req, res, next) {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.redirect('/dashboard');
})

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            req.logout();
            res.redirect('/');
        }
    })
});

router.get('/ping', function(req, res, next) {
    res.send("pong!", 200);
})

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.json(req.session.passport.user)
    res.render('index', {
        title: 'Express',
        username: req.username
    });
});

module.exports = router;
