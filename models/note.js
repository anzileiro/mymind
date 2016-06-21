'use strict'

const Repository = require('../utils/repository.js')

let model = Repository.Model.extend({
    tableName: 'mm_tb_note',
    hasTimestamps: true,
    hidden: ['id', 'created_at', 'updated_at', 'ds_password']
})

module.exports = model
