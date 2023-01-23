const UserAccess = require('../../../models/userAccess')
const { setUserInfo } = require('./setUserInfo')
const { generateToken, generateRefreshToken } = require('./generateToken')
const {
  getIP,
  getBrowserInfo,
  getCountry,
  buildErrObject
} = require('../../../middleware/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const saveUserAccessAndReturnToken = (req = {}, user = {}) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      ip: getIP(req),
      browser: getBrowserInfo(req),
      country: getCountry(req)
    })
    userAccess.save(async (err) => {
      try {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        const userInfo = await setUserInfo(user)
        // Returns data with access token
        const { token, expiry } = generateToken(user._id)
        const { token: refreshToken, expiry: refreshExpiry } =
          generateRefreshToken(user._id)
        resolve({
          token: token,
          expiry: expiry,
          user: userInfo,
          refreshToken: refreshToken,
          refreshExpiry: refreshExpiry
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}
const refreshUserAccessAndReturnToken = (req = {}, user = {}) => {
  return new Promise((resolve, reject) => {
    const userAccess = new UserAccess({
      email: user.email,
      ip: getIP(req),
      browser: getBrowserInfo(req),
      country: getCountry(req)
    })
    userAccess.save(async (err) => {
      try {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        const userInfo = await setUserInfo(user)
        // Returns data with access token
        const { token, expiry } = generateToken(user._id)

        resolve({
          token: token,
          expiry: expiry,
          user: userInfo
        })
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  saveUserAccessAndReturnToken,
  refreshUserAccessAndReturnToken
}
