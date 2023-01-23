/* eslint-disable camelcase */
/* eslint-disable max-statements */
require('dotenv').config()
const express = require('express')
const router = express.Router()
const { mint } = require('../controllers/XrplSegmint/MintNFT')

router.post('/', mint)

module.exports = router
