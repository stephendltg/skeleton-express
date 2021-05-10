/**
 * Table for relationships beetween psot & term
 */

 exports.up = function(knex) {
    return knex.schema.createTable('term_relationships', t => {
        t.bigInteger('object_id').unsigned().defaultTo(0)
        t.bigInteger('term_id').unsigned().defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('term_relationships')
};
