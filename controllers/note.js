'use strict'

const Uuid      = require('uuid-v4')
,     Md5       = require('md5')
,     Joi       = require('joi')
,     Model     = require('../models/note.js')

let routes = [
    {
        method: 'POST',
        path: '/v1/note',
        handler: (request, reply) => {

            let register = {
                hash_edit:      request.payload.hash,
                hash_share:     Md5(Uuid()).substr(0, 10),
                tt_note:        request.payload.note,
                ds_password:    Md5(`${request.payload.password}${process.env.SALT_KEY}`)
            }

            console.log(register)
    
            Model.forge(register)
                 .save()
                 .then((note) => reply(note), (err) => reply(err))
                 .catch((err) => {
                     throw err
                 })
        },
        config: {
            validate: {
                payload: {
                    hash:       Joi.string().required().min(10).max(10),
                    note:       Joi.string().max(10000),
                    password:   Joi.string().min(6).max(32)
                    
                }
            }
        }
    }
]

module.exports = {
    routes: routes
}
