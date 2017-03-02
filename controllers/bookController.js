let Book = require('../models/book')

let faker = require('faker')

module.exports = {
  index: function(req, res, next){
    Book.find({}, function(err, books){
      if (err) {
        res.send(err)
      } else {
        res.json(books)
      }
    })
  },
  create: function(req, res, next){
    let book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    })

    book.save(function(err){
      if(err){
        res.send(err)
      } else {
        res.send('Book saved')
      }
    })
  },
  show: function(req, res, next){
    Book.findById(req.params.id, function(err, book){
      if (err) {
        console.log(err);
      } else {
        res.json(book)
      }
    })
  },
  destroy: function(req, res, next){
    // Using find and remove
    Book.findByIdAndRemove(req.params.id, function(err){
      if(err) throw err
      res.json('Book Deleted')
    })
  },
  test: function(req, res, next){
    res.send('tested')
  },
  update: function(req, res, next){
    Book.findById(req.params.id, function(err, book){
      if(err) throw err
      book.category = req.body.category

      book.save(function(err){
        if(err) throw err
        res.json('Book updated')
      })
    })
  },
  generate: function(req, res, next){
    for (let i = 0; i < req.params.amount; i++) {
      let book = new Book({
        isbn: faker.internet.mac(),
        title: faker.lorem.words(),
        author: faker.name.findName(),
        category: faker.commerce.department(),
        stock: faker.random.number()
      })

      book.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Book created');
        }
      })

    }
  }
}
