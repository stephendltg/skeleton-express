"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes session.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()


/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

/**
 * Get session
 */
router.get('/', function(req, res) { 
    if( req.session.cache ){
        res.json(req.session.cache)
    } else {
        res.status(404)
        res.json()
    }

})


/**
 * Post session
 */
 router.post('/', function(req, res) {

    req.session.cache = req.body
    res.status(201)
    res.json()
})

/**
 * Delete session
 */
 router.delete('/', function(req, res) {

    req.session.cache = null
    res.json()
})

module.exports = router
