"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes auth.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router  = express.Router()
const users   = require('../controllers/users')
const bcrypt  = require('bcrypt')
const redux = require('../config/redux')


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
 * Get all users
 */
router.get('/', function(req, res) { 

    // Parse login and password from headers: Authorization: Basic ZXB5bzplcHlv
    const b64auth           = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    users.all({
        search: login
    }, false)
    .then( (result)=> {
        if( bcrypt.compareSync(password, result[0].user_pass) ){

            result[0].token   = bcrypt.hashSync(login, 10)
            req.session.token = bcrypt.hashSync(result[0].token, 10)
            req.session.user_activation_key = result[0].user_activation_key
            req.session.uuid  = result[0].id

            result[0].role = redux.get('auth:profiles:' +  result[0].user_activation_key, {role: 'visitor'} ).role

            delete result[0].user_pass
            delete result[0].user_activation_key
            res.json(result)
        } else {
            res.status(401)
            res.json()
        }
    })
    .catch( e => errorhandle(e, res) )

})

/**
 * Get check token
 */
 router.get('/token', function(req, res) { 

    // Parse token: Authorization: Bearer ${token}
    const token = (req.headers.authorization || '').split(' ')[1] || ''

    if( !req.session.token || !bcrypt.compareSync(token, req.session.token || null) ){
        res.status(401)
    }
    res.json()

})

/**
 * Get logout
 */
 router.get('/logout', function(req, res) { 

    delete req.session.token
    req.session.destroy( ()=> res.json() )
})


module.exports = router
