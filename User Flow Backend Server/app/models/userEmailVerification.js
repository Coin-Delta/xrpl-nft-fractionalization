const mongoose = require('mongoose')

const UserEmailVerification = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    otp: {
      type: Number
    },
    type: {
      type: String
    },
    registerDate: {
      type: Number
    },
    expiry: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('UserEmailVerification', UserEmailVerification)
