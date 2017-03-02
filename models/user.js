const mongoose = require('mongoose');
const db = require('../db/mongo');

let userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
}, {
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User
