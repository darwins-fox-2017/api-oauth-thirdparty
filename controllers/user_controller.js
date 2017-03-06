let user        = require('../models/user')
var jwt           = require('jsonwebtoken');
var passwordHash  = require('password-hash');

var signin_user = function(req, res, next) {
  var pwd = req.body.password
  var name = req.body.username
  user.find({where:{username: name}})
  .then(function (data) {
    // console.log(data.dataValues)
    if(passwordHash.verify(pwd, data.password)) {
      var token = jwt.sign({id: data.id, username: data.username}, 'shhhhh');
      res.send(token)
    } else {
      res.send('Unauthorized')
    }
  })
}

var signup_user = function(req, res){
  var hashed = passwordHash.generate(req.body.password);
  user.create(
    {
      username : req.body.username,
      password: hashed
    }).then(function(data){
      res.send(data);
  })
}

// var get_user = function(req, res){
//   models.User.findAll().then(function (results){
//     res.send(results)
//   })
// }
//
// var post_user = function(req, res){
//   var hashed = passwordHash.generate(req.body.password);
//   models.User.create(
//     {
//       username : req.body.username,
//       password: hashed
//     }).then(function(data){
//       res.send(data);
//   })
// }
//
// var get_id_user = function(req, res){
//   var idGet = req.params.id
//   models.User.findById(idGet).then(function (results){
//     res.send(results)
//   })
// }
//
// var delete_user = function(req, res){
//   var idDel = req.params.id
//   models.User.findById(idDel).then(function (results){
//     if(results){
//       results.destroy({where:{id:req.body.id}})
//       res.send(results)
//     } else {
//       res.send('ERROR!')
//     }
//   })
// }
//
// var put_user = function(req, res){
//   var idPut = req.params.id
//   models.User.findById(idPut).then(function (data){
//     models.User.update(
//       {
//         username : req.body.username,
//         password:req.body.password
//       }, {where:{id: req.params.id}}).then(function (results){
//       res.send(data)
//       })
//     })
// }

module.exports = {
  signin_user,
  signup_user
  // get_user,
  // post_user,
  // get_id_user,
  // delete_user,
  // put_user
}
