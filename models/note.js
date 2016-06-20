'use strict'

const Repository = require('../utils/repository.js')

module.exports = Repository.Bookshelf.Model.extend({
    tableName: 'mm_tb_note',
    hasTimestamps: true,
    hidden: ['id_note', 'created_at', 'updated_at', 'hash_pass']
})