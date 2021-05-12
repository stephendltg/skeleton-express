"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes options.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const options = require('../controllers/options')
const sanitize = require('../utils/sanitize')
const {size} = require('../utils/validator')


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
 * Get all options
 */
router.get('/', function(req, res) { 

  options.all()
    .then( (result)=> res.json(result) )
    .catch( e => errorhandle(e, res))

})

/**
 * Get settings
 */
 router.get('/settings', function(req, res) { 

    options.autoload()
      .then( (result)=> res.json( result.map( field => [ field.name, JSON.parse(field.value) ] ) ) )
      .catch( e => errorhandle(e, res))
  
  })

/**
 * Get option
 */
 router.get('/:name', function(req, res) { 

    options.field({name: sanitize.key(req.params.name)})
      .then( (result)=> res.json( result[0] && typeof result[0] === 'string' ? JSON.parse(result[0]) : null ) )
      .catch( e => errorhandle(e, res))
  
})

/**
 * Post settings
 */
 router.post('/settings', function(req, res) { 

    // Check if array
    if( !Array.isArray(req.body) ) {
        res.status(400)
        res.json()
        return
    }

    options.settings()
    .then( settings => {
        // Update settings
        req.body.forEach(field => {
            
            if( !field[1] || !settings.includes(field[0]) ) return

            let name  = sanitize.key(field[0])
            let value = sanitize.stripTags(field[1])

            options.update( { name: name, body: { value: JSON.stringify(value) } })
                .catch( e => errorhandle(e, res))
        })

        res.status(200)
        res.json()
    })
    .catch( e => errorhandle(e, res))
})

/**
 * Post option
 */
 router.post('/', function(req, res) { 

    let params = { 
        name: sanitize.key(req.body.name),
        value: req.body.value ? JSON.stringify(req.body.value) : null
    }

    if( size(params.name) < 3 || params.value == null ){
        res.status(400)
        res.json()
    } else {
        options.add(params)
            .then( (result)=> {
                res.status(201)
                res.json(result) 
            })
            .catch( e => errorhandle(e, res)) 
    }
})

/**
 * Update option
 */
 router.post('/:name', function(req, res) { 

    let params = { 
        value: req.body.value ? JSON.stringify(req.body.value) : null
    }

    if( params.value == null ){
        res.status(400)
        res.json()
    } else {

        options.update({name: req.params.name, body: params})
            .then( (result)=> responsehandle(result, res) )
            .catch( e => errorhandle(e, res))
    }
})

/**
 * Delete option
 */
 router.delete('/:name', function(req, res) { 

    let name = sanitize.key(req.params.name)

    options.settings()
    .then( settings => { 

        // Protected settings
        if( settings.includes(name) ){
            res.status(401)
            res.json()
            return
        }

        options.del({name: name})
        .then( (result)=> responsehandle(result, res) )
        .catch( e => errorhandle(e, res))
    })

})


module.exports = router
