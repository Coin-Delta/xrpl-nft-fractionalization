const xrplnfts = require('../../../models/xrplnfts')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')

const getnftdetails = async (req, res) => {
  try {
    xrplnfts.find((err, docs) => {
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

module.exports = getnftdetails
