const { matchedData } = require('express-validator')
const {
  findForgotPassword,
  findUserByEmail,
  updatePassword,
  markResetPasswordAsUsed,
  verifyPasswordOTP
} = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const forgotPassword = await findForgotPassword(data.id)
    const user = await findUserByEmail(forgotPassword.email)
    await updatePassword(data.password, user)
    const result = await markResetPasswordAsUsed(req, forgotPassword)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

const checkEmailExist = async (req, res) => {
  try {
    req = matchedData(req)
    const { email } = req
    await findUserByEmail(email)
    res.status(200).json({ success: true, message: 'EMAIL_EXIST' })
  } catch (error) {
    handleError(res, error)
  }
}
const resetPasswordOTP = async (req, res) => {
  try {
    const data = matchedData(req)
    const { email, otp, password } = data
    const user = await findUserByEmail(email)
    const verifyOTP = await verifyPasswordOTP(user._id, otp)
    if (verifyOTP.success === false) {
      return res.status(200).json(verifyOTP)
    }
    const result = await updatePassword(password, user)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = { resetPassword, checkEmailExist, resetPasswordOTP }
