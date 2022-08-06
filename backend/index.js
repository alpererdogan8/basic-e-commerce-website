const express = require('express')
const session = require('express-session')

const PORT = 8000
require('./database/mongoose')
const { products, auth } = require('./routes')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
  res.header('Contet-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', ['*', 'http://localhost:3000'])
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({ origin: ['*', 'http://localhost:3000'], credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] })
)
app.use(cookieParser())
app.use(express.json())
app.use(session({ secret: 'sosecretcartcode', resave: true, saveUninitialized: true }))
app.use('/api/v1/auth', auth)
app.use('/', products)

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}`)
})
