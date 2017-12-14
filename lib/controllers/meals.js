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

const postFoodMeal = (request, response, next) => {
  let id = request.params.id
  let meal_id = request.params.meal_id
  Meals.create(id, meal_id)
  .then((data) => {
    let checkFood = data["food_id"]
    let checkMeal = data["meal_id"]
    let record_id = data["id"]
    if (checkFood === null) {
      return database.raw(`DELETE FROM food_meals WHERE id = ?`, [record_id])
      .then(response.status(404).json({error: "Food not found"}))
    } else if (checkMeal === null) {
      return database.raw(`DELETE FROM food_meals WHERE id = ?`, [record_id])
      .then(response.status(404).json({error: "Meal not found"}))
    } else {
      return response.sendStatus(201)
    }
  })
}

const deleteFoodMeal = (request, response, next) => {
  let id = request.params.id
  let meal_id = request.params.meal_id

  Meals.findFMRecord(id, meal_id)
  .then((data) => {
    if (data.rows.length === 0) {
      response.status(404).send({ error: "Record not found" })
    } else {
      let foodMeal_id = data.rows[0]["id"]
      Meals.deleteFM(foodMeal_id)
      .then(response.status(200).send({ message: "Deleted" }))
    }
  })
}

module.exports = {getAllMeals, getSingleMeal, postFoodMeal, deleteFoodMeal}
