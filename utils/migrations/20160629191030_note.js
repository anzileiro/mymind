'use strict'

exports.up = (knex) => knex.schema.createTable('tb_note', (table) => {
    table.increments('id').primary()
    table.string('hash', 10).unique().notNullable()
    table.string('share', 10).unique().notNullable()
    table.string('password', 32).nullable()
    table.text('note', 'longtext').nullable()
    table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('tb_note')