"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes users.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const users = require('../controllers/users');
const sanitize = require('../utils/sanitize');
const bcrypt = require('bcrypt');


/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

/**
 * Error handler
 * 
 * @param {object} err 
 * @param {object} res 
 */
const errorhandle = ( err, res ) => {
  res.status(404)
  res.json(err)
}

/**
 * Handle response 
 * 
 * @param {integer} result 
 * @param {object} res 
 */
const responsehandle = ( result, res ) => {
  if( result === 0) res.status(404)
  else res.status(200)
  res.json(result)
}


/**
 * Get all users
 */
router.get('/', function(req, res) { 

  users.all(req.query)
    .then( (result)=> res.json(result))
    .catch( e => errorhandle(e, res))

})

/**
 * Get user Id
 */
router.get('/:id', function(req, res) { 

  users.all({id: req.params.id})
    .then( (result)=> {
      result[0].user_meta = JSON.parse(result[0].user_meta)
      res.json(result)
    })
    .catch( e => errorhandle(e, res))

})



/**
 * Create user Id
 */
 router.post('/', function(req, res) { 

  let user_login    = sanitize.user( req.body.user_login || '' ) || null
  let user_pass     = req.body.user_pass || null
  let user_email    = sanitize.email(req.body.user_email || '' ) || null
  let display_name  = req.body.display_name ? sanitize.user( req.body.display_name ) : user_login
  let user_meta     = req.body.user_meta || null
  let user_activation_key = req.body.user_activation_key ? parseInt(req.body.user_activation_key) : 0
  
  // Meta
  try {
    let meta = new Map(user_meta)
    user_meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    user_meta = null
  }

  // Check entries
  if( !user_login || !user_pass || !user_email ){
    res.status(400)
    res.json()
    return
  }

  users.add({
    user_login: user_login,
    user_pass: bcrypt.hashSync(user_pass, 10),
    user_email: user_email,
    display_name: display_name,
    user_meta: user_meta,
    user_activation_key: user_activation_key
  })
    .then( (result)=> res.json(result))
    .catch( e => errorhandle(e, res))

})

/**
 * Update user Id
 */
 router.post('/:id', function(req, res) { 

  let params = {
    user_login    : sanitize.user( req.body.user_login || '' ) || null,
    user_pass     : req.body.user_pass || null,
    user_email    : sanitize.email(req.body.user_email || '' ) || null,
    display_name  : sanitize.user( req.body.display_name || '' ) || null,
    user_meta     : req.body.user_meta || null,
    user_activation_key: req.body.user_activation_key ? parseInt(req.body.user_activation_key) : 0
  }

  // Meta
  try {
    let meta = new Map(params.user_meta)
    params.user_meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    delete params.user_meta
  }

  // Hash
  if( params.user_pass ) params.user_pass = bcrypt.hashSync(params.user_pass, 10)

  // Filter null value
  for( const field in params) if( !params[field] ) delete params[field]

  users.update( req.params.id, params)
    .then( (result)=> {
      if( result === 0 ) res.status(404)
      res.json(result) 
    })
    .catch( e => errorhandle(e, res))

})

/**
 * Delete User ID
 */
 router.delete('/:id', function(req, res) { 

  // Protected User admin (id: 1)
  if( req.params.id === '1' ) {
    res.status(401)
    res.json()
    return
  }

  users.del(req.params.id)
      .then( (result)=> responsehandle(result, res) )
      .catch( e => errorhandle(e, res))
})

module.exports = router
