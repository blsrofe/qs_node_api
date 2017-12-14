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
  let food, meal;
  let id = request.params.id
  let meal_id = request.params.meal_id
  Foods.fetchSingle(id)
  .then((data) => {
    if(!data) { return response.status(404).send({ error: "Food not found" }) }
    food = data
  })
  .then(() => {
    return database.raw(`SELECT m.id, m.name FROM meals m where m.id = ?`, [meal_id])
  })
  .then((data) => {
    if(!data) { return response.status(404).send({ error: "Meal not found" }) }
    meal = data.rows
  })
  .then(() => {
  return database.raw(`
    INSERT INTO food_meals (food_id, meal_id, created_at)
    VALUES (?, ?, ?)`,
    [id, meal_id, new Date])
  })
  .then(() => {
    return response.status(201).send({ success: `${food["name"]} has been added to ${meal[0]["name"]}`})
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
