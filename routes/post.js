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
const posts = require('../controllers/posts')
const relationships = require('../controllers/relationships')
const debug   = require('debug')(NAME + ':route:posts')
const sanitize = require('../utils/sanitize')
const {is} = require('../utils/validator')
const _date = require('dateformat')


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
 * Get all posts
 */
router.get('/', function(req, res) {

  posts.all(req.query)
    .then( (result)=> {
      result.map( _ => {
        _.meta = JSON.parse(_.meta)
        _.terms_id = _.terms_id ? _.terms_id.split(',') : []
        _.terms = _.terms ? _.terms.split(',') : []
      })
      res.json(result) 
    })
    .catch( e => errorhandle(e, res))

})

/**
 * Get all post by type
 */
 router.get('/:type', function(req, res) {

  let type = sanitize.key(req.params.type)

  // Search by Id is available
  if( is.num(type) ) {
      req.query = {id: type}
      type = ''
  }

  posts.all(req.query, type)
    .then( (result)=> {
      result.map( _ => {
        _.meta = JSON.parse(_.meta)
        _.terms_id = _.terms_id ? _.terms_id.split(',') : []
        _.terms = _.terms ? _.terms.split(',') : []
      })
      res.json(result) 
    })
    .catch( e => errorhandle(e, res))

})


/**
 * Create Post
 */
 router.post('/', function(req, res) {

  // Params for query post
  let params = { 
    title: req.body.title ? sanitize.stripTags(req.body.title.toString()) : undefined,
    post_modified: _date(new Date(), 'yyyy-mm-dd HH:MM:ss'),
    post_name: req.body.post_name ? sanitize.key(req.body.post_name.toString()) : (req.body.title ? sanitize.key(req.body.title.toString()) : undefined),
    author: req.session.uuid,
    meta: req.body.meta || null,
    excerpt: req.body.excerpt ? sanitize.stripTags(req.body.excerpt.toString()) : undefined
  }

  // Params for query relationships
  let terms = req.body.terms && Array.isArray(req.body.terms) ? req.body.terms : undefined

  // Meta
  try {
    let meta = new WeakMap(params.meta)
    params.meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    delete params.meta
  }

  posts.add(params)
    .then( async (result)=> {
      // Wrap terms if exist
      if (terms) {
        let relationterms = []
        terms.filter( _ => typeof _ === 'number' && _ >= 0 ).map( _ => relationterms.push({ object_id: result[0], term_id: _ }) )
        await relationships.add(relationterms).catch( e => debug(e))
      }
      res.status(201)
      res.json(result) 
    })
    .catch( e =>  errorhandle(e, res) )
})

/**
 * Post term by type or update by id
 */
 router.post('/:type', function(req, res) {

  let type = sanitize.key(req.params.type.toString())

  let params = { 
    title: req.body.title ? sanitize.stripTags(req.body.title.toString()) : undefined,
    post_modified: _date(new Date(), 'yyyy-mm-dd HH:MM:ss'),
    post_name: req.body.post_name ? sanitize.key(req.body.post_name.toString()) : (req.body.title ? sanitize.key(req.body.title.toString()) : undefined),
    author: req.session.uuid,
    meta: req.body.meta || null,
    excerpt: req.body.excerpt ? sanitize.stripTags(req.body.excerpt.toString()) : undefined
  }

  // Params for query relaionships
  let terms = req.body.terms && Array.isArray(req.body.terms) ? req.body.terms : undefined

  // Meta
  try {
    let meta = new WeakMap(params.meta)
    params.meta = JSON.stringify(Array.from(meta.entries()))
  } catch (e) {
    delete params.meta
  }

  if( is.num(type)) {

    posts.update( type, params)
    .then( async (result)=> {
      // Wrap terms if exist
      if (terms) {
        let relationterms = []
        terms.filter( _ => typeof _ === 'number' && _ >= 0 ).map( _ => relationterms.push({ object_id: parseInt(type), term_id: _ }) )
        await relationships.add(relationterms).catch( e => debug(e))
      }
      res.status(200)
      res.json(result) 
    })
    .catch( e => errorhandle(e, res) )
    
  } else {

    // Overload params
    params.post_type = type || 'post'

    posts.add(params)
    .then( async (result)=> {
      // Wrap terms if exist
      if (terms) {
        let relationterms = []
        terms.filter( _ => typeof _ === 'number' && _ >= 0 ).map( _ => relationterms.push({ object_id: result[0], term_id: _ }) )
        await relationships.add(relationterms).catch( e => debug(e))
      }
      res.status(201)
      res.json(result) 
    })
    .catch( e => errorhandle(e, res) )
  }
})


/**
 * Delete post Id
 */
 router.delete('/:id', function(req, res) {

  posts.all({id: req.params.id}, '*' )
    .then( post => {

      if( post.length == 0 ) return errorhandle(undefined, res)

      posts.del(req.params.id)
        .then( async result => {
          await relationships.delIdObject(req.params.id).catch( e => debug(e))
          responsehandle(result, res)
        })
        .catch( e => errorhandle(e, res) )
    })
    .catch( e => errorhandle(e, res) )
})


module.exports = router
