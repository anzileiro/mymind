'use strict'

const URL_CONN = `${process.env.DATABASE_URL}?ssl=true`

module.exports = {
  development: {
    client: 'pg',
    connection: URL_CONN
  },
  production: {
    client: 'pg',
    connection: URL_CONN,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
