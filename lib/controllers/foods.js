const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const Foods = require('../models/foods')

const getAllFoods = (request, response, next) => {
  Foods.fetchAll()
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const getSingleFood = (request, response, next) => {
  let id = request.params.id
  Foods.fetchSingle(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

const deleteFood = (request, response, next) => {
  let id = request.params.id
  Foods.deleteFood(id)
  .then((data) => {
    if (!data) { return response.sendStatus(404) }
    response.json(data)
  })
}

module.exports = {getAllFoods, getSingleFood, deleteFood}
