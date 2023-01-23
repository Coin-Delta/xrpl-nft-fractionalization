const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { register } = require('./register')
const {
  resetPassword,
  checkEmailExist,
  resetPasswordOTP
} = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { verify } = require('./verify')
const { verifyOTP } = require('./verifyOTP')
const { resendOTP } = require('./resendOTP')
const { refreshToken } = require('./refreshToken')
module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  register,
  resetPassword,
  roleAuthorization,
  verify,
  verifyOTP,
  checkEmailExist,
  resetPasswordOTP,
  resendOTP,
  refreshToken
}
