var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//login-local

router.post('/login',passport.authenticate('didit-login'), userController.login);

router.post('/register', userController.register);

//login-facebook
router.get('/auth/facebook/login', passport.authenticate('facebook', {scope: 'email'}))

router.use('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

//login-google

router.get('/auth/google/login', passport.authenticate('google', {scope: ['profile', 'email']}))

router.use('/auth/google/callback', passport.authenticate('google', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

//login- twitter

router.get('/auth/twitter/login', passport.authenticate('twitter'))

router.use('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

//login github

router.get('/auth/github/login', passport.authenticate('github'));

router.use('/auth/github/callback', passport.authenticate('github', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))


router.get('/auth/login/failed', function (req, res) {
  res.send('error')
})

router.get('/auth/login/success', function (req, res) {
  res.send('okey')
})

module.exports = router;
