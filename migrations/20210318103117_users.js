/**
 * Table for users
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('id').primary().unsigned()
        t.string('user_login', 60).unique().index().notNullable()
        t.string('user_pass', 255).notNullable()
        t.string('display_name', 250)
        t.string('user_email', 100).unique().index().notNullable()
        t.integer('user_activation_key')
        t.timestamp('user_registered').defaultTo(knex.fn.now())
        t.json('user_meta').nullable()
        // t.text('user_meta', 'longtext')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
