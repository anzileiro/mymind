'use strict'

exports.up = (knex) => knex.schema.createTable('mm_tb_note', (table) => {
    table.increments('id').primary()
    table.string('hash_edit', 10).unique().notNullable()
    table.string('hash_share', 10).unique().notNullable()
    table.string('ds_password', 32).nullable()
    table.text('tt_note', 'longtext').nullable()
    table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('mm_tb_note')