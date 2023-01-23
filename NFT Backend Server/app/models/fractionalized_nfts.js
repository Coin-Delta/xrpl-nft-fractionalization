/* eslint-disable camelcase */
const mongoose = require('mongoose')

const fractionalized_nfts = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  fractions: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('fractionalized_nfts', fractionalized_nfts)
