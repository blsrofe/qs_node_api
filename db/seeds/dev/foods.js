
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods(name, calories, created_at) VALUES (?, ?, ?)',
        ["Banana", 150, new Date]
      ),
      knex.raw(
        'INSERT INTO foods(name, calories, created_at) VALUES (?, ?, ?)',
        ["Bagel Bites-Four Cheese", 650,  new Date]
      )
    ])
  })
}
