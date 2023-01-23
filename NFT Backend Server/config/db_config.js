/* eslint-disable no-undef */

const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

module.exports = () => {
  mongoose.set('strictQuery', true)
  mongoose.connect(
    DB_URL,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log('********************************')
        console.log('Database Connection Error: ', err)
        console.log('********************************')
      } else {
        console.log('*******************************')
        console.log('Database connected successfully')
        console.log('*******************************')
      }
    }
  )
}
