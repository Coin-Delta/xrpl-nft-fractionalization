const {
  validateForgotPassword,
  validateResetRequest
} = require('./validateForgotPassword')
const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const {
  validateResetPassword,
  validateResetPasswordOTP
} = require('./validateResetPassword')
const { validateVerify } = require('./validateVerify')
const { validateVerifyOTP } = require('./validateVerifyOTP')
const { validateResend } = require('./validateResend')
const { validateRefreshToken } = require('./validateRefreshToken')
module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerify,
  validateVerifyOTP,
  validateResetPasswordOTP,
  validateResetRequest,
  validateResend,
  validateRefreshToken
}
