/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()

const fractionalize_state = require('../models/fractionalize_state')

router.get('/', (req, res) => {
  try {
    const query = { identifier: req.query.identifier }
    fractionalize_state.findOne(query, (err, docs) => {
      if (!err && docs !== null) {
        res.status(200).send({
          completed: docs.state
        })
      } else if (docs === null) {
        res.status(200).send({
          Message:
            'Identifier not found or fractionalization is in initial stage'
        })
      } else {
        throw new Error(err)
      }
    })
  } catch (err) {
    res.status(500).send({
      Message: err.message
    })
  }
})

module.exports = router
