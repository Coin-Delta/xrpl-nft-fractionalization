const handleError = (res, message = {}) => {
  res.status(500).json({
    Error: {
      Message: message,
    },
  })
}

module.exports = { handleError }
