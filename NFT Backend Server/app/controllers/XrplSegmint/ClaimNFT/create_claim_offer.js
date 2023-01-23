/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

const { XummSdk } = require('xumm-sdk')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)

const xrpl = require('xrpl')

const resolved = require('../helpers/resolved')
const timer = require('../helpers/timer')

const create_claim_offer = async (req, res) => {
  try {
    const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_WALLET_SEED)
    const currency_code = req.body.token_name

    const tx_blob = {
      txjson: {
        TransactionType: 'NFTokenCreateOffer',
        Owner: req.body.address,
        NFTokenID: req.body.token_id,
        Amount: {
          currency: currency_code,
          value: req.body.fractions,
          issuer: cold_wallet.address,
        },
      },
      user_token: req.headers.user_token,
    }

    const payload = await Sdk.payload.createAndSubscribe(tx_blob, false)
    let result = await resolved(payload.created.uuid)

    while (1) {
      if (result.meta.resolved === false) {
        await timer(5000)
        result = await resolved(payload.created.uuid)
      } else {
        break
      }
    }

    if (result.meta.signed === false) {
      res.status(200).send({
        Message: 'Transaction not signed',
      })
    } else {
      res.status(200).send({
        Message: 'Transaction signed',
        Data: result,
      })
    }
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = create_claim_offer
