const { registerUser } = require('./helpers')

const { handleError } = require('../../middleware/utils')
const { emailExists } = require('../../middleware/emailer')
const {
  CognitoUserPool,
  CognitoUserAttribute
} = require('amazon-cognito-identity-js')
const { poolData } = require('../../../config/UserPool')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
  try {
    const doesEmailExists = await emailExists(req.body.email)
    if (!doesEmailExists) {
      const userPool = new CognitoUserPool(poolData)

      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: req.body.email })
      ]

      userPool.signUp(
        req.body.email,
        req.body.password,
        attributes,
        null,
        async (err, data) => {
          if (err) {
            handleError(res, err)
          }
          console.log(data)
          req.body.userId = data.userSub
          const userFromDb = await registerUser(req)
          res.status(200).json(userFromDb)
        }
      )
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { register }
