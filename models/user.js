var mongoose = require('mongoose');
var Schema = mongoose.Schema

var newUser = new Schema({
  local:{
    username: String,
    password: String,
    email: String
  },
  facebook:{
    id: String,
    token: String,
    email: String,
    name: String
  },
  google:{
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter:{
    id: String,
    token: String,
    name: String,
    username: String
  },
  github:{
    id: String,
    token: String,
    name: String,
    username: String
  }
})

var User = mongoose.model('User', newUser)

module.exports = User
