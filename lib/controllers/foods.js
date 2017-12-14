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

const postFood = (request, response, next) => {
  let name = request.body.food.name
  let calories = request.body.food.calories
  if (!name) {
    return response.status(422).send({ error: "No name property provided!"})
  } else if (!calories) {
    return response.status(422).send({error: "No calories property provided!"})
  }
  Foods.create(name, calories)
  .then((data) => {
    if (!data) {return response.sendStatus(404) }
    response.status(201).json(data)
  })
}

const editFood = (request, response, next) => {
  let id = request.params.id
  let name = request.body.food.name
  let calories = request.body.food.calories

  if (!name) {
    return response.status(422).send({ error: "No name property provided!"})
  } else if (!calories) {
    return response.status(422).send({error: "No calories property provided!"})
  }

  Foods.update(name, calories, id)
  .then((data) => {
    if (!data) {return response.sendStatus(404) }
    response.status(201).json(data)
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

module.exports = {getAllFoods, getSingleFood, postFood, editFood, deleteFood}
