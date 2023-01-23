/* eslint-disable camelcase */
require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
  connect_wallet,
  resolved
} = require('../controllers/XrplSegmint/XummWallet')

router.get('/', connect_wallet)

router.post('/resolved', resolved)

module.exports = router
