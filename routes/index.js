var express         = require('express');
var router          = express.Router();
var user_controller = require('../controllers/user_controller')
var helper          = require('../helper/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express')
});

router.post('/signin', user_controller.signin_user)

router.post('/signup', user_controller.signup_user)

module.exports = router;
