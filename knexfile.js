'use strict'

const url = `${process.env.DATABASE_URL}?ssl=true`

module.exports = {
  development: {
    client: 'pg',
    connection: url
  },
  production: {
    client: 'pg',
    connection: url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
