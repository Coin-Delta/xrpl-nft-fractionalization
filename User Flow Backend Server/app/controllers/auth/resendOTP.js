const { matchedData } = require('express-validator')
const {
  findUserByEmail,

  SendRegisterOTP
} = require('./helpers')
const { handleError } = require('../../middleware/utils')

const resendOTP = async (req, res) => {
  try {
    const locale = req.getLocale()
    req = matchedData(req)
    const { email } = req
    const user = await findUserByEmail(email)
    await SendRegisterOTP(locale, user)
    res.status(200).json({ success: true, message: 'OTP_SENT' })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { resendOTP }
