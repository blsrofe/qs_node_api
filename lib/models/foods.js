const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAll = () => {
  return database.raw("SELECT * FROM foods")
  .then((data) => {
    return data.rows
  })
}

const fetchSingle = (id) => {
  return database.raw("SELECT * FROM foods WHERE id=?", [id])
  .then((data) => {
    return data.rows[0]
  })
}

const create = (name, calories) => {
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING name, calories',
    [name, calories, new Date])
  .then((data) => {
    return data.rows
  })
}

const update = (name, calories, id) => {
  return database.raw(
    'UPDATE foods SET name=?, calories=? WHERE id=? RETURNING id, name, calories', [name, calories, id])
  .then((data) => {
    return data.rows
  })
}

const deleteFood = (id) => {
  return database.raw("DELETE FROM foods WHERE id=?", [id])
  .then((data) => {
    return data.rows
  })
}

module.exports = {fetchAll, fetchSingle, create, update, deleteFood}
