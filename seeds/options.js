
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('options').del()
    .then(function () {
      // Inserts seed entries
      return knex('options').insert([
        {name: 'lang', value: JSON.stringify('en'), autoload: 'yes'},
        {name: 'title', value: JSON.stringify('my app'), autoload: 'yes'},
        {name: 'description', value: JSON.stringify(null), autoload: 'yes'}
      ]);
    });
};
