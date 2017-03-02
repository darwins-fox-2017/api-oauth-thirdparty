'use strict'
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
})

var user = mongoose.model('User', userSchema)

module.exports = user
