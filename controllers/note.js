'use strict'

const Http    = require('../utils/http.js')
,     Model   = require('../models/note.js')
,     Md5     = require('md5')
,     Uuid    = require('uuid-v4')

let controller = {
    create: (request, reply) => {

            let register = {
                hash_edit: request.payload.hash,
                hash_share: Md5(Uuid()).substr(0, 10),
                tt_note: request.payload.note,
                ds_password: Md5(`${request.payload.password}${process.env.SALT_KEY}`)
            }

            Model.forge(register)
                 .save()
                 .then((note) => {
                    return reply(Http.created('successfully created', note)).code(201)
                }, (err) => {
                    return reply(Http.internalServerError('an error has occurred', err)).code(500)
                })
                 .catch((err) => {
                     throw err
                 })
                 
        },

        getByHash: (request, reply) => {

            Model.forge({ 
                    hash_edit: encodeURIComponent(request.params.hash) 
                })
                .fetch()
                .then((note) => { 
                    if (note) {
                        return reply(Http.ok('successfully', note)).code(200)
                    }
                    return reply(Http.notFound('resource not found')).code(404)
                }, (err) => {
                    return reply(Http.internalServerError('an error has occurred', err)).code(500)
                })
                .catch((err) => {
                    throw err
                })

        }
}

module.exports = controller