/**
 * Table for options 
 */

exports.up = function(knex) {
    return knex.schema.createTable('options', t => {
        t.increments('id').primary().unsigned()
        t.string('name', 191).unique().index().notNullable()
        t.text('value', 'longtext')
        t.string('autoload', 20)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('options')
};
