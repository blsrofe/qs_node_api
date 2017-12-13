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

const deleteFood = (id) => {
  return database.raw("DELETE FROM foods WHERE id=?", [id])
  .then((data) => {
    return data.rows
  })
}

module.exports = {fetchAll, fetchSingle, deleteFood}
