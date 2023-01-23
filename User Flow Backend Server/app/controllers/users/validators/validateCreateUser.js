const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateUser = [
  check('firstName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('role').isIn(['user', 'admin']).withMessage('USER_NOT_IN_KNOWN_ROLE'),
  check('userName').optional(),
  check('profilepic').optional(),
  check('coverimage').optional(),
  check('externalProfileLink').optional(),
  check('bio').optional(),
  check('isActive').optional(),
  check('isEmailVerified').optional(),
  check('isSegMintVerified').optional(),
  check('registerDate').optional(),
  check('verification').optional(),
  check('verified').optional(),
  check('loginAttempts').optional(),
  check('blockExpires').optional(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateUser }
