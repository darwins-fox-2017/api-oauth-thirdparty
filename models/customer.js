// load
let mongoose = require('mongoose')

// define book schema
let CustomerSchema = new mongoose.Schema({
  name: String,
  memberid: String,
  address: String,
  zipcode: String,
  phone: String,
}, {
  timestamps: true
})

// Export mongoose model

module.exports = mongoose.model('Customer', CustomerSchema)
