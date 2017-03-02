var express = require('express');
var router = express.Router();

let transactionController = require('../controllers/transactionController')


/* GET home page. */
router.get('/', transactionController.index);

// sample : {{host}}/transactions/58b6882ea1bd12533ff15315
router.get('/:id', transactionController.show)

// sample : {{host}}/transactions/create
/*
isbn:986-343-3214-2414-2
title:Gowes to campus
author:Diky Arga
category:health
stock:7
*/
router.post('/create', transactionController.create)

// Update sample : {{host}}/transactions/update/58b6882ea1bd12533ff15315
router.put('/update/:id', transactionController.update)

// Update sample : {{host}}/transactions/destroy/58b6882ea1bd12533ff15315
router.delete('/destroy/:id', transactionController.destroy)

router.get('/test', transactionController.test)

// Generateor  sample {{host}}/transactions/generate/100
router.get('/generate/:amount', transactionController.generate)

module.exports = router;
