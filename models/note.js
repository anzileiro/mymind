'use strict'

const Repository = require('../utils/repository.js')

let model = Repository.Model.extend({
    tableName: 'tb_note',
    hasTimestamps: true,
    hidden: ['id', 'created_at', 'updated_at', 'password']
})

module.exports = model
