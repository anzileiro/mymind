'use strict'

const Joi           = require('joi')
,     Controller    = require('../controllers/note.js')

let routes = [
    {
        method: 'POST',
        path: '/v1/note',
        handler: Controller.create,
        config: {
            validate: {
                payload: {
                    hash: Joi.string().required().min(10).max(10),
                    note: Joi.string().max(10000),
                    password: Joi.string().min(6).max(32)
                    
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/note/{hash}',
        handler: Controller.getByHash
    }
]

module.exports = routes