
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('term_relationships').del()
    .then(function () {
      // Inserts seed entries
      return knex('term_relationships').insert([
        {object_id: 0, term_id: 0}
      ]);
    });
};
