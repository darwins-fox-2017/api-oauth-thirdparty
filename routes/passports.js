var express         = require('express');
var router          = express.Router();
var passport        = require('passport');

router.get('/',
  function(req, res) {
    res.send("You're in Login");
});

router.get('/local',
  function(req, res){
    res.send('login');
  });

router.post('/local',
  passport.authenticate('Isumi-Strategy'),
  function(req, res) {
    res.send('Your Token : xxx');
  });

router.get('/exit',
  function(req, res){
    req.logout();
    res.send("You're Logout Now!");
  });


//FACEBOOK
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  function(req, res) {
  // Successful authentication, redirect home.
  res.send('Callback success');
  }
);

router.post('/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.send('Your Token : xxx');
    }
);

router.get('/facebook/exit',
  function(req, res){
    req.logout();
    res.send("You're Logout Now!");
  }
);

//Twitter
router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  function(req, res) {
  // Successful authentication, redirect home.
  res.send('Callback success');
  }
);

router.post('/twitter',
  passport.authenticate('twitter', { failureRedirect: '/login/twitter' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Your Token : xxx');
});

router.get('/twitter/exit',
  function(req, res){
    req.logout();
    res.send("You're Logout Now!");
  }
);

//Google
router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
  function(req, res) {
  // Successful authentication, redirect home.
  res.send('Callback success');
  }
);

router.post('/google',
  passport.authenticate('google', { failureRedirect: '/login/google' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('Your Token : xxx');
});

router.get('/google/exit',
  function(req, res){
    req.logout();
    res.send("You're Logout Now!");
  }
);



module.exports = router;
