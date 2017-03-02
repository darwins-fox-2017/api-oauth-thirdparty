let User = require('../models/user')


register = function(req, res, next) {
  let dataInput = new User({
    username: req.body.username,
    password: req.body.password
  })
  dataInput.save(function(err) {
    if(err) res.send(err)
    else {
      res.send("Data has been created")
    }
  })
}

module.exports = {register: register}
