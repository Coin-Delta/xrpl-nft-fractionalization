/* eslint-disable camelcase */
// const xrpl = require('xrpl')

const xrplnfts = require('../../../models/xrplnfts')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')

const getnftdetails_of_account = async (req, res) => {
  try {
    const wallet_addr = req.query.address
    const query = { owner: wallet_addr }
    xrplnfts.find(query, (err, docs) => {
      if (!err) {
        res.status(200).send({
          Data: docs,
        })
      } else {
        throw new Error(err)
      }
    })
  } catch (err) {
    return handleError(buildErrorMessage(err.message))
  }
}

module.exports = getnftdetails_of_account
