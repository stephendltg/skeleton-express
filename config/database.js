'use strict';

/**
 * Name: app
 * Description: 
 * Sub Module: Database connection
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const env       = process.env.NODE_ENV || 'development'
const knexfile  = require('../knexfile')
const knex      = require('knex')(knexfile[env])

module.exports = knex

// Force create database tables in production mode
if( process.env.NODE_ENV !== 'development') knex.migrate.latest([knexfile]).then( () => knex.seed.run([knexfile]));