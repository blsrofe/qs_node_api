const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAll = () => {
  return database.raw(
    `SELECT m.id, m.name, json_agg(foods_row) AS foods
    FROM meals m
    INNER JOIN food_meals fm on fm.meal_id = m.id
    INNER JOIN
      (select f.id, f.name, f.calories
      FROM foods f
      INNER JOIN food_meals fm on fm.food_id = f.id
      INNER JOIN meals m on m.id = fm.meal_id
      GROUP BY f.id)
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
      GROUP BY f.id)
    foods_row on foods_row.id = fm.food_id where m.id = ${meal_id}
    GROUP BY m.id`)
  .then((data) => {
    return data.rows
  })
}

const create = (id, meal_id) => {
  return database.raw(`
    INSERT INTO food_meals (food_id, meal_id, created_at)
    VALUES ((SELECT f.id FROM foods f WHERE f.id = ?), (SELECT m.id FROM meals m WHERE m.id = ?), ?) RETURNING *`,
    [id, meal_id, new Date])
  .then((data) => {
    return data.rows[0]
  })
}

const deleteFM = (foodMeal_id) => {
  return database.raw(`DELETE
                FROM food_meals
                WHERE id = ?`, [foodMeal_id])
}

const findFMRecord = (food_id, meal_id) => {
  return database.raw(`
    SELECT * FROM food_meals
    WHERE food_id = ?
    AND meal_id = ?
    LIMIT 1
  `, [food_id, meal_id])
}

module.exports = {fetchAll, fetchSingle, create, deleteFM, findFMRecord}
