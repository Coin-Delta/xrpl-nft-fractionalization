/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()

const {
  getnftdetails_of_account,
  getnftdetails,
  getnftdetails_of_single
} = require('../controllers/XrplSegmint/GetNFTDetails')

router.get('/of_account', getnftdetails_of_account)
router.get('/single', getnftdetails_of_single)
router.get('/', getnftdetails)

module.exports = router
