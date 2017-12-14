const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const Foods = require('./lib/models/foods')
const FoodsController = require('./lib/controllers/foods')
const MealsController = require('./lib/controllers/meals')
const Meals = require('./lib/models/meals')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

app.get('/api/v1/foods', FoodsController.getAllFoods)
app.get('/api/v1/foods/:id', FoodsController.getSingleFood)
app.delete('/api/v1/foods/:id', FoodsController.deleteFood)
app.post('/api/v1/foods', FoodsController.postFood)
app.put('/api/v1/foods/:id', FoodsController.editFood)

app.get('/api/v1/meals/:meal_id/foods', MealsController.getSingleMeal)
app.get('/api/v1/meals', MealsController.getAllMeals)
app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  let id = request.params.id
  let meal_id = request.params.meal_id
  return database.raw(`
    INSERT INTO food_meals (food_id, meal_id, created_at)
    VALUES ((SELECT f.id FROM foods f WHERE f.id = ?), (SELECT m.id FROM meals m WHERE m.id = ?), ?) RETURNING *`,
    [id, meal_id, new Date])
  .then((data) => {
    let checkFood = data.rows[0]["food_id"]
    let checkMeal = data.rows[0]["meal_id"]
    let record_id = data.rows[0]["id"]
    if (checkFood === null) {
      return database.raw(`DELETE FROM food_meals WHERE id = ?`, [record_id])
      .then(response.status(404).json({error: "Food not found"}))
      //response.status(404).json({error: "Food not found"})
    } else if (checkMeal === null) {
      return database.raw(`DELETE FROM food_meals WHERE id = ?`, [record_id])
      .then(response.status(404).json({error: "Meal not found"}))
    } else {
      return response.sendStatus(201)
    }
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
