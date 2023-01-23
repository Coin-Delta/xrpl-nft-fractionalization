/* eslint-disable camelcase */
const mongoose = require('mongoose')
// const crypto = require('crypto')

const fractionalize_state = new mongoose.Schema({
  identifier: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  token_name: {
    type: String,
    required: true
  },
  fractions: {
    type: String,
    required: true
  },
  nft_token_id: {
    type: String,
    required: true
  },
  nft_buy_hash: {
    type: String,
    default: '0'
  }
})

module.exports = mongoose.model('fractionalize_state', fractionalize_state)
