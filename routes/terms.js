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
const terms = require('../controllers/terms')
const relationships = require('../controllers/relationships')
const debug   = require('debug')(NAME + ':route:terms')
const sanitize = require('../utils/sanitize')
const {is}       = require('../utils/validator')


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
 * Get all terms
 */
router.get('/', function(req, res) {

  terms.all(req.query)
    .then( (result)=> {
      result.map( _ => _.term_meta = JSON.parse(_.term_meta))
      res.json(result) 
    })
    .catch( e => errorhandle(e, res))

})

/**
 * Get all terms by type
 */
 router.get('/:type', function(req, res) {

  let type = sanitize.key(req.params.type)

  // Search by Id is available
  if( is.num(type) ) {
      req.query = {id: type}
      type = ''
  }

  terms.all(req.query, type)
    .then( (result)=> {
      result.map( _ => _.term_meta = JSON.parse(_.term_meta))
      res.json(result) 
    })
    .catch( e => errorhandle(e, res))

})


/**
 * Post term
 */
 router.post('/', function(req, res) {

  let params = { 
    name: req.body.name ? sanitize.words(req.body.name.toString()) : undefined,
    slug: req.body.name ? sanitize.key(req.body.name.toString()) : undefined,
    description: req.body.description ? sanitize.stripTags(req.body.description.toString()) : undefined,
    term_meta: req.body.term_meta || null,
  }

  // Meta
  try {
    let meta = new WeakMap(params.term_meta)
    params.term_meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    delete params.term_meta
  }

  terms.add(params)
    .then( (result)=> {
      res.status(201)
      res.json(result) 
    })
    .catch( e => errorhandle(e, res) )
})

/**
 * Post term by type or update by id
 */
 router.post('/:type', function(req, res) {

  let type = sanitize.key(req.params.type.toString())

  let params = { 
    name: req.body.name ? sanitize.words(req.body.name.toString()) : undefined,
    description: req.body.description ? sanitize.stripTags(req.body.description.toString()) : undefined,
    term_meta: req.body.term_meta || null
  }

  // Meta
  try {
    let meta = new WeakMap(params.term_meta)
    params.term_meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    delete params.term_meta
  }

  if( is.num(type)) {

    terms.update( type, params)
    .then( (result)=> {
      res.status(200)
      res.json(result) 
    })
    .catch( e => errorhandle(e, res) )
    
  } else {

    // Overload params
    params.type = type || 'post'
    params.slug = req.body.name ? sanitize.key(req.body.name.toString()) : undefined

    terms.add(params)
      .then( (result)=> {
        res.status(201)
        res.json(result) 
      })
      .catch( e => errorhandle(e, res) )
  }
})


/**
 * Delete term Id
 */
 router.delete('/:id', function(req, res) {

  terms.all({id: req.params.id} )
    .then( term => {

      if( term.length == 0 ) return errorhandle(undefined, res)

      terms.del(req.params.id)
        .then( async result => {
          await relationships.delIdTerm(req.params.id).catch( e => debug(e))
          responsehandle(result, res)
        })
        .catch( e => errorhandle(e, res) )
    })
    .catch( e => errorhandle(e, res) )
})


module.exports = router
