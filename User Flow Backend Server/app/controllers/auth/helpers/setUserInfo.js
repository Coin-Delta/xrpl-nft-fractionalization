/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req = {}) => {
  return new Promise((resolve) => {
    let user = {
      _id: req._id,
      firstName: req.firstName,
      lastName: req.lastName,
      role: req.role,
      email: req.email,
      verified: req.verified,
      coverimage: req.coverimage,
      profilepic: req.profilepic
    }
    // // Adds verification for testing purposes
    // if (process.env.NODE_ENV !== 'production') {
    // }
    user = {
      ...user,
      verification: req.verification
    }
    resolve(user)
  })
}

module.exports = { setUserInfo }
