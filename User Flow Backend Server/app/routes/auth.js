const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  register,
  verify,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  login,
  roleAuthorization,
  verifyOTP,
  checkEmailExist,
  resetPasswordOTP,
  resendOTP,
  refreshToken
} = require('../controllers/auth')

const {
  validateRegister,
  validateVerify,
  validateForgotPassword,
  validateResetPassword,
  validateLogin,
  validateVerifyOTP,
  validateResetPasswordOTP,
  validateResetRequest,
  validateResend,
  validateRefreshToken
} = require('../controllers/auth/validators')

/*
 * Auth routes
 */

/*
 * Register route
 */
router.post('/register', trimRequest.all, validateRegister, register)

/*
 * Verify route
 */
router.post('/verify', trimRequest.all, validateVerify, verify)

router.post('/verifyOTP', trimRequest.all, validateVerifyOTP, verifyOTP)

/*
 * Forgot password route
 */
router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

/*
 * Reset password route
 */
router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

/* resend registration otp */

router.post(
  '/resendVerificationCode',
  trimRequest.all,
  validateResend,
  resendOTP
)

router.get(
  '/email/exist',
  trimRequest.all,
  validateResetRequest,
  checkEmailExist
)

router.post(
  '/resetPassword',
  trimRequest.all,
  validateResetPasswordOTP,
  resetPasswordOTP
)
/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  roleAuthorization(['user', 'admin']),
  trimRequest.all,
  getRefreshToken
)
router.post(
  '/refreshToken',
  trimRequest.all,
  validateRefreshToken,
  refreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validateLogin, login)

module.exports = router
