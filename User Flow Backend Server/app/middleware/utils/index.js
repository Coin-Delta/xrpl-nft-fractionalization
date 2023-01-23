const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { handleError } = require('./handleError')
const { isIDGood } = require('./isIDGood')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')

module.exports = {
  buildErrObject,
  buildSuccObject,
  handleError,
  isIDGood,
  removeExtensionFromFile
}
