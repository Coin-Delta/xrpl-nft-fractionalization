/* eslint-disable no-undef */
/* eslint-disable no-return-assign */

const { default: axios } = require('axios')

const resolved = async (uuid) => {
  try {
    const url = `https://xumm.app/api/v1/platform/payload/${uuid}`
    const config = {
      headers: {
        accept: 'application/json',
        'X-API-Key': process.env.XUMM_API_KEY,
        'X-API-Secret': process.env.XUMM_API_SECRET,
        'Accept-Encoding': 'gzip,deflate,compress',
      },
    }

    let result

    await axios.get(url, config).then((res) => (result = res.data))
    return result
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = resolved
