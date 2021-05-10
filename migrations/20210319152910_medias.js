/**
 * Table for medias (uploads or file with retain)
 */

 exports.up = function(knex) {
    return knex.schema.createTable('medias', t => {
        t.increments('id').unsigned().primary()
        t.bigInteger('author').unsigned().defaultTo(0)
        t.timestamp('datetime').notNullable().defaultTo(knex.fn.now())
        t.string('guid', 255).notNullable().defaultTo('') // path
        t.string('mime_type', 20).notNullable().defaultTo('')
        t.string('name', 200).notNullable()
        t.text('details', 255).notNullable().defaultTo('')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('medias')
};
