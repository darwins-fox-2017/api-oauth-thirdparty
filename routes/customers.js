var express = require('express');
var router = express.Router();

let customerController = require('../controllers/customerController')


/* GET home page. */
router.get('/', customerController.index);

// sample : {{host}}/customers/58b6882ea1bd12533ff15315
router.get('/:id', customerController.show)

// sample : {{host}}/customers/create
/*
name:Diky Arga
memberid:xxx
address:Semarang, Indonesia
zipcode:51372
phone:08728732183621
*/
router.post('/create', customerController.create)

// Update sample : {{host}}/customers/update/58b6882ea1bd12533ff15315
router.put('/update/:id', customerController.update)

// Update sample : {{host}}/customers/destroy/58b6882ea1bd12533ff15315
router.delete('/destroy/:id', customerController.destroy)

router.get('/test', customerController.test)

// Generateor  sample {{host}}/customers/generate/100
router.get('/generate/:amount', customerController.generate)

module.exports = router;
