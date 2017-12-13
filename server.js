const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const Foods = require('./lib/models/foods')
const FoodsController = require('./lib/controllers/foods')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())

app.get('/api/v1/foods', FoodsController.getAllFoods)

app.get('/api/v1/meals', (request, response) => {
  database.raw('select m.*, array_agg(f_row) as foods from meals m inner join food_meals fm on fm.meal_id = m.id inner join (select f.* from foods f inner join food_meals fm on fm.food_id = f.id inner join meals m on m.id = fm.meal_id order by f.id) f_row on f_row.id = fm.food_id group by m.id')
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
