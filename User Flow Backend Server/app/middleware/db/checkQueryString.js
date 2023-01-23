/* eslint no-nested-ternary: "off"*/
const { buildErrObject } = require('../../middleware/utils')
const mongoose = require('mongoose')
/**
 * Checks the query string for filtering records
 * query.filter should be the text to search (string)
 * query.fields should be the fields to search into (array)
 * @param {Object} query - query object
 */
const checkQueryString = (query = {}) => {
  return new Promise((resolve, reject) => {
    try {
      if (
        typeof query.filter !== 'undefined' &&
        typeof query.fields !== 'undefined'
      ) {
        const data = {
          $and: []
        }
        const andArray = []
        // Takes fields param and builds an array by splitting with ','
        const arrayFields = query.fields.split(',')
        // Adds SQL Like %word% with regex
        const arrayFilters = query.filter.split(',')
        arrayFilters.map((value) => {
          const array = []
          arrayFields.map((item) => {
            array.push({
              [item]:
                value === 'true' || value === 'false'
                  ? value
                  : mongoose.Types.ObjectId.isValid(value) || !isNaN(value)
                  ? value
                  : {
                      $regex: new RegExp(value, 'i')
                    }
            })
          })
          andArray.push({ $or: array })
        })
        // Puts array result in data
        data.$and = andArray
        resolve(data)
      } else {
        resolve({})
      }
    } catch (err) {
      console.log(err.message)
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

module.exports = { checkQueryString }
