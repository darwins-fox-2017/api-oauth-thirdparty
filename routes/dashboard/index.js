var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  // res.json(req.session)
  console.log(req.session);
  if(req.session.passport){
    res.render('dashboard/index', {username: req.session.passport.user})

  } else {
    res.redirect('/login')
  }
})

module.exports = router;
