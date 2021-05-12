"use strict";

/**
 * Name: app
 * Description: middleware configuration
 * Sub Module: app.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const cors = require('cors')
const favicon = require('serve-favicon')
const statusMonitor = require('express-status-monitor')


const crypto  = require('crypto')
const hmac    = crypto.createHmac('sha256', __filename).digest('hex').substr(0, 10)

// Sentry ref: https://docs.sentry.io/platforms/node/guides/express/
const Sentry  = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// Sentry settings
Sentry.init({
  dsn: "https://31c74d7a437e4d01933380342748a794@o652606.ingest.sentry.io/5761478",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ 
      app
    })
  ],
  tracesSampleRate: 1.0,
});


/**
 * Logger for dev
 */ 
const logger = require('morgan')

/**
 * Logger app monitoring for production
 */
const bunyan = require('bunyan')
const bunyanMiddleware = require('bunyan-middleware')

/**
 * Session
 */
const knex = require('./config/database')
const store = new KnexSessionStore({knex}); // defaults to a sqlite3 database

/**
 * Redux
 */
const redux = require('./config/redux')

/** --------------------------------------------------------------------------------------------- */
/** ROUTES  ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const optionsRouter = require('./routes/options')
const sessionRouter = require('./routes/session')
const attachmentsRouter = require('./routes/attachments')

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */
var app = express()

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(helmet({
  contentSecurityPolicy: false,
}))
app.use(compression())

/**
 * Session 
 */
app.use(session({
  secret: hmac,
  name: 'app_' + NAME + '_' + hmac,
  resave: true,
  saveUninitialized : true,
  cookie: {
    maxAge: 86400000 // 24 hour,
  },
  store
}))

/**
 * Logs dev & production
 */
if (process.env.NODE_ENV === 'production') {
  app.use(bunyanMiddleware({ 
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'req_id',
    obscureHeaders: [],
    logger: bunyan.createLogger({ 
      name: NAME,
      streams: [{
        type: 'rotating-file',
        path: ABSPATH + 'logs/server.log',
        period: '1d',
        count: 3
      }]
    })
  }))
} else {
  app.use(logger('dev'))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * Routes monitor status
 */
app.use(statusMonitor({
  title: NAME.toUpperCase() + ' Status',
  theme: 'default.css',
  path: '/status',
  spans: [{
    interval: 1,  // Every second
    retention: 60 // Keep 60 datapoints in memory
  }, {
    interval: 5,  // Every 5 seconds
    retention: 60
  }, {
    interval: 15, // Every 15 seconds
    retention: 60
  }],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },
  healthChecks: [{
    protocol: 'http',
    host: 'localhost',
    path: '/',
    port: PORT || '3000'
  }, {
    protocol: 'http',
    host: 'localhost',
    path: '/apidocs',
    port: PORT || '3000'
  }],
  ignoreStartsWith: '/admin'
}))

/**
 * Routes static
 */
app.use(favicon(path.join(__dirname,'static','images','favicon.ico')))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/admin', express.static(path.join(__dirname, 'admin')))
app.use('/', express.static(path.join(__dirname, 'frontend')))

/**
 * Route api docs
 */
if (process.env.NODE_ENV !== 'production')
  app.use('/apidocs', express.static(path.join(__dirname, '__docs/apidocs')))




/**
 * Routes
 */
app.use('/install', indexRouter)
app.use('/api/json/v1/auth', authRouter)
app.use('/api/json/v1/session', sessionRouter)

/**
 * Route auth
 */
app.use(function (req, res, next) {

  // Methods by profil
  let methods = redux.get('auth:profiles:' + req.session.user_activation_key, { methods: ['GET', 'HEAD', 'OPTIONS'] } ).methods
  if( req.session.token && methods.includes(req.method) ) {
    next()
  } else {
    res.status(401)
    res.json()
  }

})

/**
 * Routes protected
 */

app.use('/api/json/v1/users', usersRouter)
app.use('/api/json/v1/options', optionsRouter)
app.use('/api/json/v1/attachments', attachmentsRouter)

/**
 * Catch 404 and forward to error handler
 */ 
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

// Sentry: The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

module.exports = app
