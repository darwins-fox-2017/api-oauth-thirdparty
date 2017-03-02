// load
let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema

let Book = require('./book')
// define book schema

let transactionSchema = Schema({
  memberid: String,
  days: Number,
  out_date: Date,
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist: [{
    type: Schema.Types.ObjectId, ref: 'Book'
  }]
}, {
  timestamps: true
})

// let TransactionSchema = new mongoose.Schema({
//   memberid: String,
//   days: Number,
//   out_date: Date,
//   due_date: Date,
//   in_date: Date,
//   fine: Number,
//   booklist: [{
//     type: this.Types.ObjectId, ref: 'Book'
//   }]
// }, {
//   timestamps: true
// })

// Export mongoose model
module.exports = mongoose.model('Transaction', transactionSchema)
