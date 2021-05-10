
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('options').del()
    .then(function () {
      // Inserts seed entries
      return knex('options').insert([
        {name: 'lang', value: JSON.stringify('en'), autoload: 'yes'},
        {name: 'title', value: JSON.stringify('epyo-visiom'), autoload: 'yes'},
        {name: 'milestone_hostname', value: JSON.stringify(null), autoload: 'yes'},
        {name: 'milestone_username', value: JSON.stringify(null), autoload: 'yes'},
        {name: 'milestone_password', value: JSON.stringify(null), autoload: 'yes'}
      ]);
    });
};
