/* eslint-disable camelcase */

const xrplnfts = require('../../../models/xrplnfts')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')

const getnftdetails_of_single = async (req, res) => {
  try {
    const tokenId = req.query.token_id
    const query = { token_id: tokenId }

    xrplnfts.findOne(query, (err, docs) => {
      if (!err) {
        res.status(200).send({
          data: docs,
        })
      } else {
        throw new Error(err)
      }
    })
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = getnftdetails_of_single
