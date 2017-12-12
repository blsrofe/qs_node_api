
module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/qs',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/qs_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    // connection: process.env.DATABASE_URL,
    connection: 'postgres://daystdwvskjopi:5d5ac6d766101c9779553c0511108198f765a140a38c3cb58d210065938df55c@ec2-54-221-204-161.compute-1.amazonaws.com:5432/dbdcvj2r6649tk',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true,
    ssl: true
  }
}
