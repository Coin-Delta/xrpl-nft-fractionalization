/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable max-statements */
/* eslint-disable camelcase */

const xrpl = require('xrpl')
const fractionalize_state = require('../../../models/fractionalize_state')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')

const create_buy_offer = async (req, res) => {
  try {
    const identifier = req.body.identifier
    const query = { identifier: identifier }
    const doc = await fractionalize_state.findOne(query, (err, docs) => {
      if (!err) {
        docs.state = 'create_buy_offer'
        docs.save((error) => {
          if (error) {
            throw new Error(error)
          }
        })
        return docs
      } else {
        throw new Error(err)
      }
    })

    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233/', {
      connectionTimeout: '20000',
    })
    await client.connect()

    const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_WALLET_SEED)
    const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_WALLET_SEED)

    const currency_code = doc.token_name
    const tx_blob = {
      TransactionType: 'NFTokenCreateOffer',
      Account: hot_wallet.classicAddress,
      Owner: doc.account,
      NFTokenID: doc.nft_token_id,
      Amount: {
        currency: currency_code,
        value: doc.fractions,
        issuer: cold_wallet.address,
      },
      Flags: null,
    }

    const tx = await client.submitAndWait(tx_blob, { wallet: hot_wallet })

    if (tx.result.meta.TransactionResult === 'tesSUCCESS') {
      res.status(200).send({
        Success: true,
      })
    } else {
      res.status(200).send({
        Success: false,
        Hash: tx.result.hash,
      })
    }

    const buy_hash_tx = await client.request({
      command: 'nft_buy_offers',
      nft_id: doc.nft_token_id,
    })

    const buy_hash = buy_hash_tx.result.offers[0].nft_offer_index

    await fractionalize_state.findOne(query, (err, docs) => {
      if (!err) {
        docs.nft_buy_hash = buy_hash
        docs.save((error) => {
          if (error) {
            throw new Error(error)
          }
        })
      } else {
        throw new Error(err)
      }
    })

    client.disconnect()
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = create_buy_offer
