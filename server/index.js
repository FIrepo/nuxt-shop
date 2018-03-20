import express from 'express'
import {Nuxt, Builder} from 'nuxt'

require('./app/utils/load-env')
require('./app/utils/extend-methods')
const bodyParser = require('body-parser')
const httpLogger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const client = redis.createClient()

// init core
require('core-middleware')
require('core-helper')
require('core-router')
require('core-config')
require('core-logger')
require('core-model')
require('core-error')

const app = express()
app.use(httpLogger('dev'))
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))
app.use(bodyParser.urlencoded({extended: false}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  // create new redis store.
  store: new RedisStore({host: 'localhost', port: 6379, client: client}),
  saveUninitialized: false,
  resave: false
}))

const Middlewares = require('core-middleware')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 5000

app.set('port', port)

app.use(Middlewares.get('Pagination'))
app.use(Middlewares.get('AllowOrigin'))
// Load my router
// login router
require('./api/routes/auth')(app, '/api/v1/auth')
// admin router
require('./api/routes/adminRouter')(app, '/api/v1/admin')

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
