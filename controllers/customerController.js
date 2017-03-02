let Customer = require('../models/customer')

let faker = require('faker')

module.exports = {
  index: function(req, res, next){
    Customer.find({}, function(err, customers){
      if (err) {
        res.send(err)
      } else {
        res.json(customers)
      }
    })
  },
  create: function(req, res, next){
    let customer = new Customer({
      name: req.body.name,
      memberid: req.body.memberid,
      address: req.body.address,
      zipcode: req.body.zipcode,
      phone: req.body.phone
    })

    customer.save(function(err){
      if(err){
        res.send(err)
      } else {
        res.send('Customer saved')
      }
    })
  },
  show: function(req, res, next){
    Customer.findById(req.params.id, function(err, customer){
      if (err) {
        console.log(err);
      } else {
        res.json(customer)
      }
    })
  },
  destroy: function(req, res, next){
    // Using find and remove
    Customer.findByIdAndRemove(req.params.id, function(err){
      if(err) throw err
      res.json('Customer Deleted')
    })
  },
  test: function(req, res, next){
    res.send('tested')
  },
  update: function(req, res, next){
    Customer.findById(req.params.id, function(err, customer){
      if(err) throw err
      customer.category = req.body.category

      customer.save(function(err){
        if(err) throw err
        res.json('Customer updated')
      })
    })
  },
  generate: function(req, res, next){
    for (let i = 0; i < req.params.amount; i++) {
      let customer = new Customer({
        name: faker.name.findName(),
        memberid: faker.system.semver(),
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
        phone: faker.phone.phoneNumber()
      })

      customer.save(function(err){
        if(err){
          console.log(err);
        } else {
          console.log('Customer created');
        }
      })

    }
  }
}
