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
      .select(
        'posts.id',
        'posts.title', 
        'posts.guid', 
        'posts.post_status', 
        'posts.post_mime_type', 
        'posts.post_date', 
        'posts.post_modified', 
        'posts.author', 
        'posts.meta', 
        'posts.excerpt',
        knex.raw('COUNT(*) as count'),
        knex.raw('GROUP_CONCAT( DISTINCT term_relationships.term_id ) as terms_id'),
        knex.raw('GROUP_CONCAT( terms.name ) as terms')
      )
      .where( 'posts.id', params.id)
      // .andWhere( 'post_type', 'like', '%' + type + '%')
      .leftJoin('term_relationships', 'posts.id', 'term_relationships.object_id')
      .leftJoin('terms', 'term_relationships.term_id', 'terms.id')
      .groupBy('posts.id')
    } 
  
    let query =  knex('posts')
        .select(
          'posts.id',
          'posts.title', 
          'posts.guid', 
          'posts.post_status', 
          'posts.post_mime_type', 
          'posts.post_date', 
          'posts.post_modified', 
          'posts.author', 
          'posts.meta', 
          'posts.excerpt',
          knex.raw('COUNT(*) as count'),
          knex.raw('GROUP_CONCAT( DISTINCT term_relationships.term_id ) as terms_id'),
          knex.raw('GROUP_CONCAT( terms.name ) as terms')
        )
        .where( params.row || 'post_name', 'like', '%' + (params.search || '') + '%')
        .whereBetween('post_modified', [from, to])
        .orderBy( params.orderby ? params.orderby : 'post_modified', params.order || 'desc')
        .limit( params.limit || 100 )
        .offset( params.offset || 0 )
        .leftJoin('term_relationships', 'posts.id', 'term_relationships.object_id')
        .leftJoin('terms', 'term_relationships.term_id', 'terms.id')
        .groupBy('posts.id')
    
    

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

    if (type === '*') return query

    // Type constraint
    if ( !type.split(':')[1] ) query.andWhere( 'post_type', 'like', '%' + type + '%')
    else query.andWhere( 'post_type', type )
  
    return query
}

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

module.exports.all = (query, post_type = 'post') => SqlQuery( query, post_type )

module.exports.del = (id) => knex('posts').where('id', id).del()

module.exports.add = (query) => knex('posts').insert(query)

module.exports.update = (id, query) => knex('posts').where('id', id).update(query)

