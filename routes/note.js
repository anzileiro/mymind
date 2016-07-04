'use strict'

const Joi               = require('joi')
,     Controller        = require('../controllers/note.js')
,     HashController    = require('../controllers/hash.js')

let routes = [
    {
        method: 'POST',
        path: '/v1/note',
        handler: Controller.create,
        config: {
            validate: {
                payload: {
                    note: Joi.string().max(100000)   
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/v1/note/{hash}',
        handler: Controller.updateByHash,
        config: {
            validate: {
                payload: {
                    note: Joi.string().max(100000)
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/v1/note/{hash}',
        handler: Controller.deleteByHash
    },
    {
        method: 'GET',
        path: '/v1/note/{hash}',
        handler: Controller.getByHash
    },
    {
        method: 'GET',
        path: '/v1/note/validate/{hash?}',
        handler: HashController.validate
    }
]

module.exports = routes