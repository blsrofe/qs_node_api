const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

const fetchAll = () => {
  return database.raw("SELECT * FROM foods")
  .then((data) => {
    return data.rows
  })
}

module.exports = {fetchAll}
