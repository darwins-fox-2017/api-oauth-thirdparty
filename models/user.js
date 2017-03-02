'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = Schema({
  'username': String,
  'email': String,
  'password': String
})

let user = mongoose.model('user', userSchema)

module.exports = user
