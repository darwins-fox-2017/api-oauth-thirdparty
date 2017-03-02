let models        = require('../models/user')
var jwt           = require('jsonwebtoken');

// var auth = function(req, res, next) {
//   let token = req.headers.token
//   if (token) {
//     jwt.verify(token, 'shhhhh', function(err, decoded) {
//       if(err) {
//         res.send('Token is not valid!')
//       } else {
//         next()
//       }
//     })
//   } else {
//     res.send('Authentication failed!')
//   }
// }
//
// var forAdmin = function(req, res, next) {
//   let token = req.headers.token
//   if (token) {
//     jwt.verify(token, 'shhhhh', function(err, decoded) {
//       if(err) {
//         res.send('Token is not valid!')
//       } else {
//         models.User.findById(decoded.id).then(function(user){
//           if(user.role == 'admin'){
//             next()
//           } else {
//             res.send('Please login as admin!')
//           }
//         })
//       }
//     })
//   } else {
//     res.send('Authentication failed!')
//   }
// }

// module.exports = {forAdmin, auth}
