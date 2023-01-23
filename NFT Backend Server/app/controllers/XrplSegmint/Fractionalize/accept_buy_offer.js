/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable max-statements */
/* eslint-disable camelcase */

const { XummSdk } = require('xumm-sdk')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)
const resolved = require('../helpers/resolved')
const timer = require('../helpers/timer')

const fractionalize_state = require('../../../models/fractionalize_state')
const fractionalized_nfts = require('../../../models/fractionalized_nfts')

const accept_buy_offer = async (req, res) => {
  try {
    const identifier = req.body.identifier
    const query = { identifier: identifier }
    const doc = await fractionalize_state.findOne(query, (err, docs) => {
      if (!err) {
        docs.state = 'accept_buy_offer'
        docs.save()
        return docs
      } else {
        throw new Error(err)
      }
    })

    const tx_blob = {
      txjson: {
        TransactionType: 'NFTokenAcceptOffer',
        NFTokenBuyOffer: doc.nft_buy_hash,
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
        Message: 'Signature Declined',
      })
    } else {
      await fractionalize_state.findOne(query, (err, docs) => {
        if (!err) {
          docs.state = 'Fractionalized'
          docs.save((error) => {
            if (error) {
              throw new Error(error)
            }
          })
        } else {
          throw new Error(err)
        }
      })

      const set_fractionalized_nfts = new fractionalized_nfts({
        name: doc.token_name,
        tokenId: doc.nft_token_id,
        owner: doc.account,
        fractions: doc.fractions,
      })
      set_fractionalized_nfts.save((err) => {
        if (err) {
          throw new Error(err)
        }
      })
      res.status(200).send({
        Message: 'Signature found',
        Data: result,
      })
    }
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = accept_buy_offer
