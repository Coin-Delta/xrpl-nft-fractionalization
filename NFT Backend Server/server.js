/* eslint-disable no-undef */

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const init = require('./config/db_config')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3002

// Database init
init()

app.use(morgan('dev'))

app.use(
  bodyParser.json({
    limit: '20mb',
  })
)

app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true,
  })
)

app.use(cors())

app.use(require('./app/routes'))

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.join(__dirname) + '/pages/index.html')
})

const server = app.listen(PORT, () => {
  const port = server.address().port
  console.log('Server Running at port: ', port)
})
