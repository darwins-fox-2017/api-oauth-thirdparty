var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  // res.json(req.session)
  if(req.user){
    console.log(req.user.local.email);
    res.render('dashboard/index', {username: req.user.local.email, user: req.user})

  } else {
    res.redirect('/login')
  }
})

router.get('/facebook', function(req, res, next){
  res.send('welcome from FB')
})

module.exports = router;
