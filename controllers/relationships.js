"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: controller relationships
 * Author: stephen D.
 * Version: 1.0.0
 */

/** --------------------------------------------------------------------------------------------- */
/** DEFINES ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

const knex = require('../config/database')


/** --------------------------------------------------------------------------------------------- */
/** MAIN    ===================================================================================== */
/** --------------------------------------------------------------------------------------------- */

module.exports.delIdTerm = (id) => knex('term_relationships').where('term_id', id).del()

module.exports.delIdObject = (id) => knex('term_relationships').where('object_id', id).del()

module.exports.add = (query) => knex('term_relationships').insert(query)
