/* eslint-disable camelcase */
require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
  set_trustline_and_issue_token,
  set_trust_owner,
  create_buy_offer,
  accept_buy_offer
} = require('../controllers/XrplSegmint/Fractionalize')

router.post('/set_trustline_and_issue_token', set_trustline_and_issue_token)

router.post('/set_trust_owner', set_trust_owner)

router.post('/create_buy_offer', create_buy_offer)

router.post('/accept_buy_offer', accept_buy_offer)

module.exports = router
