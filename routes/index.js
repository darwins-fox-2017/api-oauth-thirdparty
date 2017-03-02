'use strict'
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/userController.js')
const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
require('../passports/passport-local.js')

/* GET home page. */
router.get('/', controllers.seed_data_users)
router.post('/login', passport.authenticate('local', {failureRedirect: '/failed'}), controllers.passport_local)

module.exports = router
