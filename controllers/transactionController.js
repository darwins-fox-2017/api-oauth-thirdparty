let Transaction = require('../models/transaction')
let faker = require('faker')


module.exports = {
  index: function(req, res, next){
    Transaction.find({}).populate('booklist').then((transactions) => {
      res.json(transactions)
    })
  },
  create: function(req, res, next){
    let transaction = new Transaction({
      memberid: req.body.memberid,
      days: req.body.days,
      out_date: req.body.out_date,
      due_date: req.body.due_date,
      in_date: req.body.in_date,
      fine: req.body.fine,
      booklist: req.body.booklist
    })

    transaction.save(function(err){
      if(err){
        res.send(err)
      } else {
        res.send('Transaction saved')
      }
    })
  },
  show: function(req, res, next){
    Transaction.findById(req.params.id, function(err, transaction){
      if (err) {
        console.log(err);
      } else {
        res.json(transaction)
      }
    })
  },
  destroy: function(req, res, next){
    // Using find and remove
    Transaction.findByIdAndRemove(req.params.id, function(err){
      if(err) throw err
      res.json('Transaction Deleted')
    })
  },
  test: function(req, res, next){
    res.send('tested')
  },
  update: function(req, res, next){
    Transaction.findById(req.params.id, function(err, transaction){
      if(err) throw err
      transaction.category = req.body.category

      transaction.save(function(err){
        if(err) throw err
        res.json('Transaction updated')
      })
    })
  },
  generate: function(req, res, next){
    for (let i = 0; i < req.params.amount; i++) {
      let transaction = new Transaction({
        memberid: req.body.memberid,
        days: req.body.days,
        out_date: req.body.out_date,
        due_date: req.body.due_date,
        in_date: req.body.in_date,
        fine: req.body.fine,
        booklist: req.body.booklist
      })

      transaction.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Transaction created');
        }
      })

    }
  }
}
