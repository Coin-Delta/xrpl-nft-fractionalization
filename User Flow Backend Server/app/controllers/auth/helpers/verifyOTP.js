const UserEmailVerification = require('../../../models/userEmailVerification')
const User = require('../../../models/user')
const { buildErrObject } = require('../../../middleware/utils')
const i18n = require('i18n')
const {
  prepareToSendEmail
} = require('../../../middleware/emailer/prepareToSendEmail')
const { verifyUser } = require('./verifyUser')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
function generateOTP() {
  return Math.floor(Math.random() * 90000) + 10000
}
const SendRegisterOTP = async (locale, user) => {
  try {
    const otp = generateOTP()
    const date = Date.now()
    i18n.setLocale(locale)
    const subject = i18n.__('registration.SUBJECT')
    const htmlMessage = i18n.__(`Your OTP for email verification is ${otp}`)
    const oldVerification = await UserEmailVerification.findOne(
      { userId: user._id },
      '_id otp registerDate expiry'
    )
    console.log(otp)
    return new Promise((resolve, reject) => {
      if (oldVerification) {
        oldVerification.otp = otp
        oldVerification.registerDate = date
        oldVerification.save((err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(item)
          prepareToSendEmail(user, subject, htmlMessage)
        })
      } else {
        const userVerification = new UserEmailVerification({
          userId: user._id,
          otp: otp,
          type: 'REGISTER',
          registerDate: date,
          expiry: 144000000
        })
        console.log(userVerification.otp)
        userVerification.save((err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(item)
          prepareToSendEmail(user, subject, htmlMessage)
        })
      }
    })
  } catch (error) {
    console.log(error)
    return error
  }
}
const sendForgetOTP = async (locale = '', user = '') => {
  try {
    const otp = generateOTP()
    const date = Date.now()
    i18n.setLocale(locale)
    const subject = i18n.__('registration.SUBJECT')
    const htmlMessage = i18n.__(`Your OTP to reset password is ${otp}`)
    const oldVerification = await UserEmailVerification.findOne(
      { userId: user._id },
      '_id otp registerDate expiry type'
    )
    console.log(otp)
    return new Promise((resolve, reject) => {
      if (oldVerification) {
        oldVerification.otp = otp
        oldVerification.registerDate = date
        oldVerification.type = 'FORGOT'
        oldVerification.save((err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(item)
          prepareToSendEmail(user, subject, htmlMessage)
        })
      } else {
        const userVerification = new UserEmailVerification({
          userId: user._id,
          otp: otp,
          type: 'FORGOT',
          registerDate: date,
          expiry: 144000000
        })
        userVerification.save((err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          resolve(item)
          prepareToSendEmail(user, subject, htmlMessage)
        })
      }
    })
  } catch (error) {
    console.log(error)
    return error
  }
}

const verifyPasswordOTP = async (id, otp) => {
  try {
    const userVerification = await UserEmailVerification.findOne(
      { userId: id },
      '_id otp registerDate expiry type'
    )
    if (!userVerification) {
      return { success: false, message: 'INVALID_REQUEST' }
    }
    if (userVerification.type == 'REGISTER') {
      return { success: false, message: 'INVALID_REQUEST' }
    }
    console.log(otp, userVerification.otp)

    const expiryTime = new Date(
      userVerification.registerDate + userVerification.expiry
    )
    if (expiryTime < new Date()) {
      return { success: false, message: 'OTP_EXPIRED' }
    } else if (userVerification.otp != otp) {
      return { success: false, message: 'OTP_INCORRECT' }
    } else if (userVerification.otp == otp) {
      await UserEmailVerification.deleteOne({
        _id: userVerification._id
      })
      return { success: true, message: 'VERIFIED' }
    }
  } catch (err) {
    console.log(err)
    return err
  }
}
const verifyOTP = async (id, otp) => {
  try {
    const userVerification = await UserEmailVerification.findOne(
      { userId: id },
      '_id otp registerDate expiry'
    )
    console.log(otp, userVerification.otp)

    if (!userVerification) {
      return { success: false, message: 'INVALID_REQUEST' }
    }
    const user = await User.findOne({ _id: id }, 'verified email')
    const expiryTime = new Date(
      userVerification.registerDate + userVerification.expiry
    )
    if (expiryTime < new Date()) {
      return { success: false, message: 'OTP_EXPIRED' }
    } else if (userVerification.otp != otp) {
      return { success: false, message: 'OTP_INCORRECT' }
    } else if (userVerification.otp == otp) {
      await verifyUser(user)
      await UserEmailVerification.deleteOne({
        _id: userVerification._id
      })
      return { success: true, message: 'VERIFIED' }
    }
  } catch (err) {
    console.log(err)
    return err
  }
}
module.exports = {
  SendRegisterOTP,
  verifyOTP,
  verifyPasswordOTP,
  sendForgetOTP
}
