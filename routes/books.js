var express = require('express');
var router = express.Router();

let bookController = require('../controllers/bookController')


/* GET home page. */
router.get('/', bookController.index);

// sample : {{host}}/books/58b6882ea1bd12533ff15315
router.get('/:id', bookController.show)

// sample : {{host}}/books/create
/*
isbn:986-343-3214-2414-2
title:Gowes to campus
author:Diky Arga
category:health
stock:7
*/
router.post('/create', bookController.create)

// Update sample : {{host}}/books/update/58b6882ea1bd12533ff15315
router.put('/update/:id', bookController.update)

// Update sample : {{host}}/books/destroy/58b6882ea1bd12533ff15315
router.delete('/destroy/:id', bookController.destroy)

router.get('/test', bookController.test)

// Generateor  sample {{host}}/books/generate/100
router.get('/generate/:amount', bookController.generate)

module.exports = router;
