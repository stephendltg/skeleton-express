"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: controlles posts
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const knex = require('../config/database')
const dateformat = require('dateformat')


/** --------------------------------------------------------------------------------------------- */
/** FUNCTION QUERY        ======================================================================= */
/** --------------------------------------------------------------------------------------------- */

function SqlQuery (params, type = 'post') {
    
    let now = Date.now()
    let year = 1000 * 60 * 60 * 24 * 365

    const from = params.from || dateformat(now - year, 'yyyy-mm-d HH:MM:ss')
    const to   = params.to   || dateformat(now, 'yyyy-mm-d HH:MM:ss')
    
    if( params.id ){
      return knex('posts')
      .select('id','title', 'guid', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'meta', 'excerpt')
      .where( 'id', params.id)
      .andWhere( 'post_type', 'like', '%' + type + '%')
    } 
  
    let query =  knex('posts')
        .select('id','title', 'guid', 'post_status', 'post_mime_type', 'post_date', 'post_modified', 'author', 'meta', 'excerpt')
        .where( params.row || 'post_name', 'like', '%' + (params.search || '') + '%')
        .whereBetween('post_modified', [from, to])
        .orderBy( params.orderby ? params.orderby : 'post_modified', params.order || 'desc')
        .limit( params.limit || 100 )
        .offset( params.offset || 0 )
    
    // Type constraint
    if ( !type.split(':')[1] ) query.andWhere( 'post_type', 'like', '%' + type + '%')
    else query.andWhere( 'post_type', type )
    
    // GroupBy
    if ( params.groupby )
      query.groupBy( params.groupby ? params.groupby.split(',') : 'post_date')

    // Add where search exact
    let where = {
      post_name: params.post_name,
      post_mime_type: params.post_mime_type,
      post_status: params.post_status,
      author: params.author,
      title: params.title
    }
    for ( const k in where ) if(!where[k]) delete where[k]
    if( Object.keys(where).length > 0 ) query.andWhere(where)
  
    return query
}

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

module.exports.all = (query, post_type = 'post') => SqlQuery( query, post_type )

module.exports.del = (id) => knex('posts').where('id', id).del()

module.exports.add = (query) => knex('posts').insert(query)

module.exports.update = (id, query) => knex('posts').where('id', id).update(query)

