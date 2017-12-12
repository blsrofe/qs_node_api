const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const assert = require('assert')
const app = require('../server')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);



describe('Server', () => {

  it('should exist', () => {
    assert(app)
  })

    before((done) => {
    this.port = 9876
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err) }
      done()
    })
  })

  after(() => {
    this.server.close()
  })

})
