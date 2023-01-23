const {
  getUserIdFromToken,
  findUserById,
  getTokenExpiry,
  refreshUserAccessAndReturnToken
} = require('./helpers')
const { isIDGood, handleError } = require('../../middleware/utils')
/**
 * Refresh token function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    let userId = await getUserIdFromToken(refreshToken)
    userId = await isIDGood(userId)
    const user = await findUserById(userId)
    const token = await refreshUserAccessAndReturnToken(req, user)
    const refreshExpiry = await getTokenExpiry(refreshToken)
    res.status(200).json({ ...token, refreshToken, refreshExpiry })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { refreshToken }
