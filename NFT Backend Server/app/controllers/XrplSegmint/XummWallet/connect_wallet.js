/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-statements */

require('dotenv').config()
const { XummSdk } = require('xumm-sdk')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)

const connect_wallet = async (req, res) => {
  try {
    const TX_BLOB = {
      txjson: {
        TransactionType: 'SignIn',
      },
    }

    const subscription = await Sdk.payload.createAndSubscribe(TX_BLOB, false)

    res.status(200).send({
      Message: 'Please Sign the transaction using Xumm wallet',
      QR: subscription.created.refs.qr_png,
      uuid: subscription.created.uuid,
    })
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = connect_wallet
