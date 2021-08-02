"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: controller terms
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const knex = require('../config/database')


/** --------------------------------------------------------------------------------------------- */
/** FUNCTION QUERY        ======================================================================= */
/** --------------------------------------------------------------------------------------------- */

function SqlQuery (params, type = 'post') {
       
    if( params.id ){
      return knex('terms')
      .select(
        'terms.id',
        'terms.name',
        'terms.slug', 
        'terms.description',
        'terms.type',
        'terms.term_meta',
        knex.raw('COUNT(*) as count'),
      )
      .where( 'id', params.id)
      // .andWhere( 'type', 'like', '%' + type + '%')
      .leftJoin('term_relationships', 'terms.id', 'term_relationships.term_id')
      .groupBy('terms.id')
    } 
  
    let query =  knex('terms')
        .select(
          'terms.id',
          'terms.name',
          'terms.slug', 
          'terms.description',
          'terms.type',
          'terms.term_meta',
          knex.raw('COUNT(*) as count')
        ) 
        .where( 'name', 'like', '%' + (params.search || '') + '%')
        .orderBy( params.orderby ? params.orderby : 'name', params.order || 'desc')
        .limit( params.limit || 100 )
        .offset( params.offset || 0 )
        .leftJoin('term_relationships', 'terms.id', 'term_relationships.term_id')
        .groupBy('terms.id')

    // Add where search exact
    let where = {
      name: params.name,
      slug: params.slug
    }
    for ( const k in where ) if(!where[k]) delete where[k]
    if( Object.keys(where).length > 0 ) query.andWhere(where)

    if (type === '*') return query

    // Type constraint
    query.andWhere('type', type)
  
    return query
}

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

module.exports.all = (query, term_type = 'post') => SqlQuery( query, term_type )

module.exports.distinct = (type = 'post') => knex('terms').where('type', type).pluck('name').distinct()

module.exports.count = (type = 'post') => knex('terms').where('type', type).count('id', {as: 'count'})

module.exports.del = (id) => knex('terms').where('id', id).del()

module.exports.add = (query) => knex('terms').insert(query)

module.exports.update = (id, query) => knex('terms').where('id', id).update(query)