let express = require('express');
const passport = require('passport');
let router = express.Router();
let userController = require('../controllers/login')
require('../authentication.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Login you little prick')
});

router.post('/', passport.authenticate('local'), function(req, res, next){
  res.send("Logged In ")
})

router.post('/register', userController.register)

router.get('/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Login facebook success');
});

router.get('/twitter',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Login twitter success');
})

router.get('/google',
  passport.authenticate('google', { scope:
  	[ 'https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] },
    { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Login google success');
})

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/google' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('success')
  });

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
passport.authenticate('github', { failureRedirect: '/login/github' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.send('success')
});


module.exports = router;
