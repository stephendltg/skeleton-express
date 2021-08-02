
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('terms').del()
    .then(function () {
      // Inserts seed entries
      return knex('terms').insert([
        {id: 0, name: 'no-category', slug: 'no-category', description: ''}
      ]);
    });
};
