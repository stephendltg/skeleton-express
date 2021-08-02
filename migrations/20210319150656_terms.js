/**
 * Table for terms
 */

 exports.up = function(knex) {
    return knex.schema.createTable('terms', t => {
        t.increments('id').primary().unsigned()
        t.string('name').notNullable()
        t.string('slug', 200).unique().notNullable()
        t.string('description', 255).notNullable()
        t.string('type', 20).notNullable().defaultTo('post')
        t.json('term_meta').nullable()
        // t.text('meta', 'longtext')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('terms')
};
