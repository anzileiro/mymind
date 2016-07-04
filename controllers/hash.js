'use strict'

const Http    = require('../utils/http.js')
,     Model   = require('../models/note.js')
,     Md5     = require('md5')
,     Uuid    = require('uuid-v4')

let rules = {
    generateNewHash() {
        return Md5(Uuid()).substr(0, 10)
    },
    validateHash(hash) {
        return hash.length === 10 ? hash : rules.generateNewHash()
    }
}

let controller = {
    validate: (request, reply) => {
        let object = {
            hash: rules.validateHash(encodeURIComponent(request.params.hash) || rules.generateNewHash()), 
            share: rules.generateNewHash()
        }

        Model.forge({ hash: object.hash })
             .fetch()
             .then((register) => {
                 if (register) {
                     return reply(Http.ok('successfully', register)).code(200)
                 } else {
                     Model.forge(object)
                          .save()
                          .then((register) => {
                              return reply(Http.created('successfully created', register)).code(201)
                          }, (err) => {
                              return reply(Http.internalServerError('an error has occurred', err)).code(500)
                          })
                          .catch((err) => {
                              return reply(Http.internalServerError('an error has occurred', err)).code(500)
                          })
                 }
             }, (err) => {
                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
             })
             .catch((err) => {
                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
             })
    }
}

module.exports = controller