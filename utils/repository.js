'use strict'

const   Knexfile        = require('../knexfile.js')
,       Knex            = require('knex')(Knexfile[process.env.NODE_ENV || 'development'])
,       Bookshelf       = require('bookshelf')(Knex)

Bookshelf.plugin('visibility')

module.exports = {
    Bookshelf: Bookshelf
}