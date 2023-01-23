const { matchedData } = require('express-validator')
const {
  verifyOTP: verfifyHelper,
  findUserByEmail,
  OTPverificationExists
} = require('./helpers')

const { handleError } = require('../../middleware/utils')
/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verifyOTP = async (req, res) => {
  try {
    req = matchedData(req)
    const { email, otp } = req
    const user = await findUserByEmail(email)
    await OTPverificationExists(user._id)
    res.status(200).json(await verfifyHelper(user._id, otp))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verifyOTP }
