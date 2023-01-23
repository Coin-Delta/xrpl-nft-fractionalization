/* eslint-disable no-constant-condition */

const responseData = require('../helpers/resolved')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const timer = require('../helpers/timer')

const resolved = async (req, res) => {
  try {
    let result = await responseData(req.body.uuid)

    while (1) {
      if (result.meta.resolved === false) {
        await timer(5000)
        result = await responseData(req.body.uuid)
      } else {
        break
      }
    }

    if (result.meta.signed === true) {
      res.status(200).send({
        Message: 'Signature found',
        USER_TOKEN: result.application.issued_user_token,
        Account: result.response.account,
      })
    } else {
      res.status(200).send({
        Message: 'Signature declined',
      })
    }
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = resolved
