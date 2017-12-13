const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAll = () => {
  return database.raw(`SELECT m.id, m.name, json_agg(foods_row) AS foods
                FROM meals m
                INNER JOIN food_meals fm on fm.meal_id = m.id
                INNER JOIN
                  (select f.id, f.name, f.calories
                  FROM foods f
                  INNER JOIN food_meals fm on fm.food_id = f.id
                  INNER JOIN meals m on m.id = fm.meal_id
                  ORDER BY f.id)
                foods_row on foods_row.id = fm.food_id
                GROUP BY m.id`)
  .then((data) => {
    return data.rows
  })
}

const fetchSingle = (meal_id) => {
  return database.raw(
    `SELECT m.id, m.name, json_agg(foods_row) as foods
    FROM meals m
    INNER JOIN food_meals fm on fm.meal_id = m.id
    INNER JOIN
      (SELECT f.id, f.name, f.calories
      FROM foods f
      INNER JOIN food_meals fm  on fm.food_id = f.id
      INNER JOIN meals m on m.id = fm.meal_id
      ORDER BY f.id)
    foods_row on foods_row.id = fm.food_id where m.id = ${meal_id}
    GROUP BY m.id`)
  .then((data) => {
    return data.rows
  })
}

module.exports = {fetchAll, fetchSingle}
