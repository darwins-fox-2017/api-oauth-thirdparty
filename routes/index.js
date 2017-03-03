'use strict'
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/userController.js')
const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
require('../passports/passport-local.js')

/* GET home page. */

router.get('/failed', (req, res) => {
  res.send('Gagal')
})

router.get('/', controllers.seed_data_users)
router.post('/login', passport.authenticate('local', {failureRedirect: '/failed'}), controllers.passport_local)

router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }), controllers.passport_facebook)

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/failed' }), controllers.passport_twitter)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), controllers.passport_google)

module.exports = router
