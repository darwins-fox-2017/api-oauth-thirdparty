'use strict'

const express = require('express')
const router = express.Router()
const SEED_USERS = require('../seeders/seed-users.js')
const models = require('../models')

const passport = require('passport')
const passportStrategy = require('passport-local').Strategy
require('../passports/passport-local.js')

module.exports = {
  seed_data_users: (req, res) => {
    models.User.insertMany(SEED_USERS).then((users) => {
      res.send(users)
    }).catch((err) => [
      res.send(err)
    ])
  },
  passport_local: (req, res) => {
    res.send(res.req.user)
  },
  passport_facebook: (req, res) => {
    res.send(res.req.user)
  },
  passport_twitter: (req, res) => {
    res.send(res.req.user)
  }
}
