"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: routes index.js
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const express = require('express')
const multer  = require('multer')
const _date   = require('dateformat')
const crypto  = require('crypto')
const fs      = require('fs')
const path    = require('path')
const router  = express.Router()
const redux   = require('../config/redux')
const debug   = require('debug')(NAME + ':route:upload')
const attachments  = require('../controllers/posts') 
const sanitize = require('../utils/sanitize')
const {is}       = require('../utils/validator')

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const POST_TYPE = 'attachments'

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
 const responsehandle = ( result, attachment, res ) => {
    if( result === 0) res.status(404)
    else {
        res.status(200)
        if( attachment ) fs.unlink(attachment.guid, err => debug(err) )
    }
    res.json(result)
  }


/**
 * DiskStorage multer
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync( 'static/' + POST_TYPE + '/' + _date(new Date(), 'yyyy/mm'), { recursive: true } )
        cb(null, 'static/' + POST_TYPE + '/' + _date(new Date(), 'yyyy/mm') )
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            cb(null, err ? undefined : raw.toString('hex') + path.extname(file.originalname) )
        })
    }
})

/**
 * Instance multer
 */
const upload  = multer({
    storage: storage,
    // dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase()
        if( !redux.get('attachments:upload:mimetype', []).includes(ext) ) return cb( new Error('Only images are allowed'))
        cb(null, true)
    }
}).fields(redux.get('attachments:upload:fields', []))



/**
 * Route upload
 */
router.post('/', function(req, res) {

    upload( req, res, err => {

        if( err instanceof multer.MulterError )
            return errorhandle(err, res)
        else if ( err )
            return errorhandle(err, res)

        // DB Query
        let query = []

        for( const field in req.files ){
            req.files[field].forEach( attachment => {
                
              query.push({
                author: req.session.uuid,
                title: sanitize.file(attachment.originalname).split('.')[0],
                post_name: sanitize.file(attachment.originalname),
                post_type: POST_TYPE + ':*',
                guid: attachment.path,
                post_mime_type: attachment.mimetype
              })
            })
        }

        // Write in DB
        attachments.add(query)
            .then( (result)=> {
                res.status(201)
                res.json(result) 
            })
            .catch( e => errorhandle(e, res))         
    })
})

/**
 * Route upload by type
 */
router.post('/:type', function(req, res) {

    const type = sanitize.key(req.params.type)

    // If is Numbers perhaps Update
    if( is.num(type)) {
        
        let params = { 
            title: req.body.title ? sanitize.key(req.body.title.toString()) : undefined,
            post_modified: _date(new Date(), 'yyyy-mm-dd HH:MM:ss'),
            author: req.session.uuid,
            meta: req.body.meta || null,
            excerpt: req.body.excerpt ? sanitize.stripTags(req.body.excerpt.toString()) : undefined
        }
        
        // Meta
        try {
          let meta = new WeakMap(params.meta)
          params.meta = JSON.stringify(Array.from(meta.entries()))
        } catch (e) {
          delete params.meta
        }
        
        attachments.all({id: type}, POST_TYPE )
            .then( (attachment) => {
                if( attachment.length == 0 ) return errorhandle(undefined, res)
                attachments.update( type, params )
                  .then( (result)=> responsehandle(result, false, res) )
                  .catch( e => errorhandle(e, res))
            })
            .catch( e => errorhandle(e, res) )

        
        // attachments.update( type, params)
        //    .then( (result)=> responsehandle(result, false, res))
        //     .catch( e => errorhandle(e, res))  

    } else {

        // Upload file
        upload( req, res, err => {

            if( err instanceof multer.MulterError )
                return errorhandle(err, res)
            else if ( err )
                return errorhandle(err, res)

            // DB Query
            let query = []

            for( const field in req.files ){
                req.files[field].forEach( attachment => {
                query.push({
                    author: req.session.uuid,
                    title: sanitize.file(attachment.originalname).split('.')[0],
                    post_name: sanitize.file(attachment.originalname),
                    post_type: POST_TYPE + ':' + type,
                    guid: attachment.path,
                    post_mime_type: attachment.mimetype
                })
                })
            }
            
            // Write in DB
            attachments.add(query)
                .then( (result)=> {
                    res.status(201)
                    res.json(result) 
                })
                .catch( e => errorhandle(e, res))         
        })

    }

})

/**
 * Get attachments
 */
 router.get('/', function(req, res) { 

    attachments.all(req.query, POST_TYPE )
      .then( (result) => {
          result.map( _ => _.meta = JSON.parse(_.meta))
          res.json(result)
      })
      .catch( e => errorhandle(e, res) )
  
})


/**
 * Get attachments by type
 */
router.get('/:type', function(req, res) { 

    let type = sanitize.key(req.params.type)

    // Search by Id is available
    if( is.num(type) ) {
        req.query = {id: type}
        type = ''
    }

    attachments.all(req.query, POST_TYPE + ':' + type )
        .then( (result) => {
            result.map( _ => _.meta = JSON.parse(_.meta))
            res.json(result)
        })
        .catch( e => errorhandle(e, res) )
  
})


/**
 * Delete attachment Id
 */
router.delete('/:id', function(req, res) {

    attachments.all({id: req.params.id}, POST_TYPE )
      .then( (attachment) => {
        if( attachment.length == 0 ) return errorhandle(undefined, res)
        attachments.del(req.params.id)
            .then( (result)=> responsehandle(result, attachment[0], res) )
            .catch( e => errorhandle(e, res))
      })
      .catch( e => errorhandle(e, res) )
})


module.exports = router
