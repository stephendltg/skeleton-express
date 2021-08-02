
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 0, title: 'My first post', post_name: 'first-post', excerpt: 'Hello'}
      ]);
    });
};
