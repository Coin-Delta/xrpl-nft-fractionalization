/* eslint-disable camelcase */
const mongoose = require('mongoose')

const XRPLNFTSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    default: null,
  },
  ExternalLink: {
    type: String,
    default: null,
  },
  owner: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  token_id: {
    type: String,
    required: true,
  },
  transferfees: {
    type: String,
    default: null,
  },
})

module.exports = mongoose.model('xrplnfts', XRPLNFTSchema)
