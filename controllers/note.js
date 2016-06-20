'use strict'

const Uuid      = require('uuid-v4')
,     Md5       = require('md5')
,     Joi       = require('joi')
,     Http      = require('../utils/http.js')
,     Model     = require('../models/note.js')

let routes = [
    {
        method: 'POST',
        path: '/v1/note',
        handler: (request, reply) => {

            let register = {
                hash_edit: request.payload.hash,
                hash_share: Md5(Uuid()).substr(0, 10),
                tt_note: request.payload.note,
                ds_password: Md5(`${request.payload.password}${process.env.SALT_KEY}`)
            }

            Model.forge(register)
                 .save()
                 .then((note) => {
                    return reply(Http.created(null, note)) 
                }, (err) => {
                    return reply(Http.internalServerError(null, err))
                })
                 .catch((err) => {
                     throw err
                 })
        },
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
        handler: (request, reply) => {

            Model.forge({ 
                hash_edit: encodeURIComponent(request.params.hash) 
            })
            .fetch()
            .then((note) => { 
                if (note) {
                    return reply(Http.ok(null, note))
                }
                return reply('not found')
            }, (err) => {
                return reply(Http.internalServerError(null, err))
            })
            .catch((err) => {
                throw err
            })
        }
    }
]

module.exports = {
    routes: routes
}
