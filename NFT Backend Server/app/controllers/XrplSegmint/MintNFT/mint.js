/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable max-statements */

require('dotenv').config()
const { XummSdk } = require('xumm-sdk')
const xrplnfts = require('../../../models/xrplnfts')
const { handleError, buildErrorMessage } = require('../../../middleware/utils')
const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET)

const resolvedData = require('../helpers/resolved')
const timer = require('../helpers/timer')

const xrpl = require('xrpl')

const mint = async (req, res) => {
  try {
    const transferfees = req.body.transferfees
    const uri = req.body.uri
    const userToken = req.headers.user_token
    const name = req.body.name
    const date = Date.now()
    const symbol = req.body.symbol
    const description = req.body.description
    const externalLink = req.body.external_link
    const address = req.body.address

    const TX_BLOB = {
      txjson: {
        TransactionType: 'NFTokenMint',
        Flags: 8,
        NFTokenTaxon: 0,
        TransferFee: parseInt(transferfees),
        URI: Buffer.from(uri, 'utf-8').toString('hex'),
      },
      user_token: userToken,
    }

    const payload = await Sdk.payload.createAndSubscribe(TX_BLOB, false)

    let result = await resolvedData(payload.created.uuid)

    while (1) {
      if (result.meta.resolved === false) {
        await timer(5000)
        result = await resolvedData(payload.created.uuid)
      } else {
        break
      }
    }

    if (result.meta.signed === false) {
      res.status(200).send({
        Message: 'Signature declined',
      })
    } else {
      const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233/', {
        connectionTimeout: '20000',
      })
      await client.connect()

      const account_nfts = await client.request({
        method: 'account_nfts',
        account: address,
      })
      const serials = account_nfts.result.account_nfts.map((o) => o.nft_serial)
      const max = Math.max(...serials)
      const index = serials.indexOf(max)
      const tokenId = account_nfts.result.account_nfts[index].NFTokenID

      client.disconnect()

      const nftDetails = new xrplnfts({
        name: name,
        owner: result.response.account,
        created_at: date,
        uri: uri,
        token_id: tokenId,
        transferfees: transferfees,
        symbol: symbol,
        Description: description,
        ExternalLink: externalLink,
      })

      nftDetails.save()

      res.status(200).send({
        Result: result,
      })
    }
  } catch (err) {
    return handleError(res, buildErrorMessage(err.message))
  }
}

module.exports = mint
