/**
 * Name: app
 * Description: database profils configuration
 * Sub Module: knexfile.js
 * Author: stephen D.
 * Version: 1.0.0
 */

require('./config/global')
const debug   = require('debug')( NAME + ':database')
const bunyan  = require('bunyan')


/**
 * Logger
 */
var log = bunyan.createLogger({ 
    name: NAME,
    streams: [{
      type: 'rotating-file',
      path: ABSPATH + 'logs/database.log',
      period: '1d',
      count: 3
    }]
});


module.exports = {
  
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    debug: true,
    log: {
      warn(msg) {
        debug( 'WARN from SQL:', msg )
      },
      error(msg){
        debug( 'ERROR from SQL:', msg )
      },
      deprecate(msg){
        debug( 'DEPRECATE from SQL:', msg )
      },
      debug(msg){
        debug( 'DEBUG from SQL:', msg )
      }
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: 3306,
      database: process.env.DB_TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: true,
    log: {
      warn(msg) {
        debug( 'WARN from SQL:', msg )
      },
      error(msg){
        debug( 'ERROR from SQL:', msg )
      },
      deprecate(msg){
        debug( 'DEPRECATE from SQL:', msg )
      },
      debug(msg){
        debug( 'DEBUG from SQL:', msg )
      }
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_TABLE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    log: {
      warn(msg) {
        log.warn( msg )
      },
      error(msg){
        log.error( msg )
      }
    }
  }

};
