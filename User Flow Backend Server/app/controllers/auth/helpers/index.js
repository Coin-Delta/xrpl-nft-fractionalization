const { blockIsExpired } = require('./blockIsExpired')
const { blockUser } = require('./blockUser')
const {
  checkLoginAttemptsAndBlockExpires
} = require('./checkLoginAttemptsAndBlockExpires')
const { checkPermissions } = require('./checkPermissions')
const { findForgotPassword } = require('./findForgotPassword')
const { findUser } = require('./findUser')
const { findUserById } = require('./findUserById')
const { findUserByEmail } = require('./findUserByEmail')
const { forgotPasswordResponse } = require('./forgotPasswordResponse')
const { generateToken, generateRefreshToken } = require('./generateToken')
const { getUserIdFromToken, getTokenExpiry } = require('./getUserIdFromToken')
const { markResetPasswordAsUsed } = require('./markResetPasswordAsUsed')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { registerUser } = require('./registerUser')
const { returnRegisterToken } = require('./returnRegisterToken')
const { saveForgotPassword } = require('./saveForgotPassword')
const { saveLoginAttemptsToDB } = require('./saveLoginAttemptsToDB')
const {
  saveUserAccessAndReturnToken,
  refreshUserAccessAndReturnToken
} = require('./saveUserAccessAndReturnToken')
const { setUserInfo } = require('./setUserInfo')
const { updatePassword } = require('./updatePassword')
const { userIsBlocked } = require('./userIsBlocked')
const {
  verificationExists,
  OTPverificationExists
} = require('./verificationExists')
const { verifyUser } = require('./verifyUser')
const {
  SendRegisterOTP,
  verifyOTP,
  verifyPasswordOTP,
  sendForgetOTP
} = require('./verifyOTP')
module.exports = {
  blockIsExpired,
  blockUser,
  checkLoginAttemptsAndBlockExpires,
  checkPermissions,
  findForgotPassword,
  findUser,
  findUserById,
  findUserByEmail,
  forgotPasswordResponse,
  generateToken,
  getUserIdFromToken,
  markResetPasswordAsUsed,
  passwordsDoNotMatch,
  registerUser,
  returnRegisterToken,
  saveForgotPassword,
  saveLoginAttemptsToDB,
  saveUserAccessAndReturnToken,
  setUserInfo,
  updatePassword,
  userIsBlocked,
  verificationExists,
  verifyUser,
  SendRegisterOTP,
  OTPverificationExists,
  verifyOTP,
  verifyPasswordOTP,
  sendForgetOTP,
  generateRefreshToken,
  refreshUserAccessAndReturnToken,
  getTokenExpiry
}
