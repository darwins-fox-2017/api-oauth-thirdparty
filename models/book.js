// load
let mongoose = require('mongoose')

// define book schema
let BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number
}, {
  timestamps: true
})

// Export mongoose model

module.exports = mongoose.model('Book', BookSchema)
