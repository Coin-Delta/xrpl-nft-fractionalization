/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable max-statements */
/* eslint-disable camelcase */

const xrpl = require('xrpl')
const { XummSdk } = require('xumm-sdk')
const resolved = require('../helpers/resolved')
const timer = require('../helpers/timer')
const fractionalize_state = require('../../../models/fractionalize_state')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)

const set_trust_owner = async (req, res) => {
  try {
    const identifier = req.body.identifier
    const query = { identifier: identifier }
    const doc = await fractionalize_state.findOne(query, (err, docs) => {
      if (!err) {
        docs.state = 'set_trust_owner'
        docs.save((err) => {
          if (err) {
            throw new Error(err)
          }
        })
        return docs
      } else {
        throw new Error(err)
      }
    })

    const currency_code = doc.token_name
    const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_WALLET_SEED)
    const tx_blob = {
      txjson: {
        TransactionType: 'TrustSet',
        LimitAmount: {
          currency: currency_code,
          issuer: cold_wallet.address,
          value: doc.fractions,
        },
      },
      user_token: req.headers.user_token,
    }

    const subscription = await Sdk.payload.createAndSubscribe(tx_blob, false)
    let result = await resolved(subscription.created.uuid)
    while (1) {
      if (result.meta.resolved === false) {
        await timer(5000)
        result = await resolved(subscription.created.uuid)
      } else {
        break
      }
    }

    if (result.meta.signed === false) {
      res.status(200).send({
        Message: 'Signature not found',
      })
    } else {
      res.status(200).send({
        Message: 'Signature found',
        Data: result,
      })
    }
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = set_trust_owner
