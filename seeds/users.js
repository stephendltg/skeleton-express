const bcrypt = require('bcrypt')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id:1, user_login: 'epyo', user_pass: bcrypt.hashSync('epyo', 10), user_email: 'epyo@epyo.eu', display_name: 'epyo', user_activation_key: 999 }
      ]);
    });
};
