/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable max-statements */
/* eslint-disable camelcase */

const xrpl = require('xrpl')
const crypto = require('crypto')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const fractionalize_state = require('../../../models/fractionalize_state')

const set_trustline_and_issue_token = async (req, res) => {
  try {
    const identifier = crypto.randomUUID()
    const account = req.body.address
    const state = 'set_trustline_and_issue_token'
    const token_name = req.body.token_name
    const fractions = req.body.fractions
    const nft_token_id = req.body.nft_token_id

    const set_state = new fractionalize_state({
      identifier: identifier,
      account: account,
      state: state,
      token_name: token_name,
      fractions: fractions,
      nft_token_id: nft_token_id,
    })

    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233/', {
      connectionTimeout: '20000',
    })
    await client.connect()

    const hot_wallet = xrpl.Wallet.fromSeed(process.env.HOT_WALLET_SEED)
    const cold_wallet = xrpl.Wallet.fromSeed(process.env.COLD_WALLET_SEED)

    const currency_code = token_name
    const TX_BLOB = {
      TransactionType: 'TrustSet',
      Account: hot_wallet.address,
      LimitAmount: {
        currency: currency_code,
        issuer: cold_wallet.address,
        value: fractions,
      },
    }

    const tx = await client.submitAndWait(TX_BLOB, { wallet: hot_wallet })

    if (tx.result.meta.TransactionResult !== 'tesSUCCESS') {
      client.disconnect()
      throw new Error('Something went wrong')
    }

    const tx_blob = {
      TransactionType: 'Payment',
      Account: cold_wallet.address,
      Amount: {
        currency: currency_code,
        value: fractions,
        issuer: cold_wallet.address,
      },
      Destination: hot_wallet.address,
      DestinationTag: 1,
    }

    const tx_new = await client.submitAndWait(tx_blob, { wallet: cold_wallet })

    if (tx_new.result.meta.TransactionResult === 'tesSUCCESS') {
      set_state.save()
      res.status(200).send({
        Success: true,
        identifier: identifier,
      })
    } else {
      throw new Error('Something went wrong while issuing tokens')
    }

    client.disconnect()
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = set_trustline_and_issue_token
