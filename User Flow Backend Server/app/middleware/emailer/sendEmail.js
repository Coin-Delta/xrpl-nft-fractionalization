/* eslint func-style: "off"*/
const nodemailer = require('nodemailer')
const aws = require('@aws-sdk/client-ses')
require('dotenv').config()

const sendEmail = async (data = {}, callback) => {
  try {
    const mailOptions = {
      from: `${process.env.EMAIL_FROM_ADDRESS}`,
      to: `${data.user.email}`,
      subject: data.subject,
      html: data.htmlMessage
    }
    function callback(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log(`Message sent: ${info?.response}`)
      }
    }

    // Send e-mail using AWS SES
    mailOptions.subject = 'Nodemailer SES transporter'

    const ses = new aws.SES({
      apiVersion: '2010-12-01',
      region: 'ap-northeast-1',
      credentials: {
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key
      }
    })
    // create Nodemailer SES transporter
    const transporter = nodemailer.createTransport({
      SES: { ses, aws }
    })

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err)
        return callback(false)
      }
      return callback(true)
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { sendEmail }
