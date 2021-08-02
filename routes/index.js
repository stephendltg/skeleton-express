"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes index.js
 * Dependencies: ejs
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const redux = require('../config/redux')

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

router.all('*', function (req, res, next){

  let methods = redux.get('auth:profiles:' + req.session.user_activation_key, { methods: ['GET', 'HEAD', 'OPTIONS'] } ).methods

  if( req.session.token && methods.includes(req.method) ) {
    next()
  } else {
    res.redirect('/login')
  }

})

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' })
})


module.exports = router
