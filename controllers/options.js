"use strict";

/**
 * Name: app
 * Description: 
 * Sub Module: controller options
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

module.exports.field = (query) => knex('options').pluck('value').where('name', query.name).limit(1)

module.exports.all = () => knex('options').pluck('name').distinct()

module.exports.add = (query) => knex('options').insert(query)

module.exports.update = (query) => knex('options').where('name', query.name).update(query.body)

module.exports.del = (query) => knex('options').where('name', query.name).del()

module.exports.autoload = () => knex('options').select('name', 'value').where('autoload', 'yes')

module.exports.settings = () => knex('options').pluck('name').where('autoload', 'yes')