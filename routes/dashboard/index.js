var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  // res.json(req.session)
  console.log(req.user.local.email);
  if(req.session.passport){
    res.render('dashboard/index', {username: req.user.local.email})

  } else {
    res.redirect('/login')
  }
})

router.get('/facebook', function(req, res, next){
  res.send('welcome from FB')
})

module.exports = router;
