var express = require('express');
var router = express.Router();

var passport = require('passport');

router.get('/register', function(req, res, next) {
    res.render('auth/register')
})

router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/dashboard',
    failureRedirect : '/register'
}))

router.get('/login', function(req, res, next) {
    res.render('auth/login')
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}))

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


router.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res) {

    });

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
      console.log(profile);
        res.redirect('/dashboard/facebook');
    });

module.exports = router;
