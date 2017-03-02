'use strict'

const express = require('express')
const router = express.Router()
const SEED_USERS = require('../seeders/seed-users.js')
const user = require('../models/user.js')

module.exports = {
  seed_data_users: (req, res) => {
    user.insertMany(SEED_USERS).then((users) => {
      res.send(users)
    }).catch((err)=>[
      res.send(err)
    ])
  }
}
