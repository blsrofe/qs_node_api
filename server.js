const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const Foods = require('./lib/models/foods')
const FoodsController = require('./lib/controllers/foods')
const MealsController = require('./lib/controllers/meals')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())

app.get('/api/v1/foods', FoodsController.getAllFoods)
app.get('/api/v1/foods/:id', FoodsController.getSingleFood)

app.get('/api/v1/meals', MealsController.getAllMeals)
app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  let meal_id = request.params.meal_id
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
    if (!data) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
