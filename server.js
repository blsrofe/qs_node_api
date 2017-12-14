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
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api/v1/meals', MealsController.getAllMeals)

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`App running on ${app.get('port')}.`)
  })
}

module.exports = app
