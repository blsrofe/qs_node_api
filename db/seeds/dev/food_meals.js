exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food_meals RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 1, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 1, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [10, 3, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [12, 3, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [6, 2, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 4, new Date]),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [7, 4, new Date]),
    ])
  })
};
