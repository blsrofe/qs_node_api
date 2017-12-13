const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Meals = require('../models/meals')

const getAllMeals = (request, response, next) => {
  Meals.fetchAll()
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const getSingleMeal = (request, response, next) => {
  let meal_id = request.params.meal_id
  Meals.fetchSingle(meal_id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

module.exports = {getAllMeals, getSingleMeal}
