"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes login.js
 * Dependencies: ejs
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const bcrypt  = require('bcrypt')
const options = require('../controllers/options')
const users = require('../controllers/users')
const sanitize = require('../utils/sanitize')
const debug   = require('debug')(NAME + ':routes:auth')

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

/* GET home page. */
router.get('/', async function(req, res) {

  // Clear session
  delete req.session.token
  req.session.destroy( ()=> debug('Session destroy') )

  // Get settings
  let getSettings = await options.autoload()
  getSettings = new Map( getSettings.map( field => [ field.name, JSON.parse(field.value) ] ) )

  // Render
  res.render('login', { 
    settings: getSettings,
    error: null
  })
})


router.post('/', async function(req, res) {

  // Sanitize username
  let username = sanitize.user(req.body.username)

  // Get settings
  let getSettings = await options.autoload()
  getSettings = new Map( getSettings.map( field => [ field.name, JSON.parse(field.value) ] ) )

  // Auth
  users.all({
    search: username
  }, false)
  .then( result => {
      if( result.length > 0 && bcrypt.compareSync(req.body.password, result[0].user_pass) ){
          req.session.token = bcrypt.hashSync(username, 10)
          req.session.user_activation_key = result[0].user_activation_key
          req.session.uuid = result[0].id
          // Redirect by user_activation_key
          res.redirect(result[0].user_activation_key === 999 ? '/admin' : '/')
      } else {
        res.render('login', { 
          settings: getSettings,
          error: 'Bad username/password'
        })
      }
  })
  .catch( e => res.render('login', { 
    settings: getSettings,
    error: 'Error database connection'
  }))

})


module.exports = router
