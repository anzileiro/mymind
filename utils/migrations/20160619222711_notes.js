'use strict'

exports.up = (knex) => knex.schema.createTable('mm_tb_note', (table) => {
    table.increments('id_note').primary()
    table.string('hash_edit', 10).unique().notNullable()
    table.string('hash_share', 10).unique().notNullable()
    table.text('text_note', 'longtext').nullable()
    table.string('hash_pass', 32).nullable()
    table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('mm_tb_note')