'use strict'

const Repository = require('../utils/repository.js')

module.exports = Repository.Bookshelf.Model.extend({
    tableName: 'mm_tb_note',
    hasTimestamps: true,
    hidden: ['id', 'created_at', 'updated_at', 'ds_password']
})