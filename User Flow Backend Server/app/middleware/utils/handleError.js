/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Sends error to user
  if (err.code && Number.isInteger(err.code)) {
    res.status(err.code)
  } else {
    res.status(400)
  }
  res.json({
    errors: {
      msg: err.message
    }
  })
}

module.exports = { handleError }
