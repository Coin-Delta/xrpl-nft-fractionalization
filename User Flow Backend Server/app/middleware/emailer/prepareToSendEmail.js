const { sendEmail } = require('./sendEmail')

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '', htmlMessage = '') => {
  try {
    user = {
      name: user?.firstName,
      email: user.email,
      verification: user.verification
    }
    const data = {
      user,
      subject,
      htmlMessage
    }
    if (process.env.NODE_ENV === 'production') {
      sendEmail(data, (messageSent) =>
        messageSent
          ? console.log(`Email SENT to: ${user.email}`)
          : console.log(`Email FAILED to: ${user.email}`)
      )
    } else if (process.env.NODE_ENV === 'development') {
      console.log(data)
      sendEmail(data, (messageSent) =>
        messageSent
          ? console.log(`Email SENT to: ${user.email}`)
          : console.log(`Email FAILED to: ${user.email}`)
      )
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = { prepareToSendEmail }
