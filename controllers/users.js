"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: controlles users
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

function SqlQuery (params, secure = true) {
    
    let now = Date.now()
    let year = 1000 * 60 * 60 * 24 * 365

    const from = params.from || dateformat(now - year, 'yyyy-mm-d HH:MM:ss')
    const to   = params.to   || dateformat(now, 'yyyy-mm-d HH:MM:ss')
    
    if( params.id ){
      return knex('users')
      .select('id','user_login', secure ? 'id' : 'user_pass', secure ? 'id' : 'user_activation_key', 'display_name', 'user_email', 'user_registered', 'user_meta')
      .where( 'id', params.id) 
    } 
  
    let query =  knex('users')
        .select('id','user_login', secure ? 'id' : 'user_pass', secure ? 'id' : 'user_activation_key', 'display_name', 'user_email', 'user_registered')
        .where( params.row || 'user_login', 'like', '%' + (params.search || '') + '%')
        .whereBetween('user_registered', [from, to])
        .orderBy( params.orderby ? params.orderby : 'user_registered', params.order || 'desc')
        .limit( params.limit || 100 )
        .offset( params.offset || 0 )
  
    if ( params.groupby )
      query.groupBy( params.groupby ? params.groupby.split(',') : 'user_registered')

    // Add where search exact
    let where = {
      user_email: params.email,
      user_login: params.username,
      display_name: params.display_name
    }
    for ( const k in where ) if(!where[k]) delete where[k]
    if( Object.keys(where).length > 0 ) query.andWhere(where)
  
    return query
}

/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

module.exports.all = (query, secure = true) => SqlQuery( query, secure )

module.exports.del = (id) => knex('users').where('id', id).del()

module.exports.add = (query) => knex('users').insert(query)

module.exports.update = (id, query) => knex('users').where('id', id).update(query)

