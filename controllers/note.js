'use strict'

const Http    = require('../utils/http.js')
,     Model   = require('../models/note.js')
,     Md5     = require('md5')
,     Uuid    = require('uuid-v4')

let rules = {
    generateNewHash() {
        return Md5(Uuid()).substr(0, 10)
    }
}

let controller = {
    create: (request, reply) => {
        let object = {
            hash: rules.generateNewHash(),
            share: rules.generateNewHash(),
            note: request.payload.note
        }

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
    },
    updateByHash: (request, reply) => {
        let object = {
            note: request.payload.note
        }

        Model.forge({ hash: request.params.hash })
             .fetch()
             .then((register) => {
                 if (register) {
                     register.save(object)
                             .then((updated) => {
                                 return reply(Http.created('successfully updated', updated)).code(200)
                             }, (err) => {
                                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
                             })
                             .catch((err) => {
                                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
                             })
                 } else {
                     return reply(Http.notFound('resource not found')).code(404)
                 }
             }, (err) => {
                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
             })
             .catch((err) => {
                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
             })
    },
    deleteByHash: (request, reply) => {
        Model.forge({ hash: request.params.hash })
             .fetch()
             .then((register) => {
                 if (register) {
                     register.destroy()
                             .then(() => {
                                 return reply(Http.created('successfully deleted')).code(200)
                             }, (err) => {
                                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
                             })
                             .catch((err) => {
                                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
                             })
                 } else {
                     return reply(Http.notFound('resource not found')).code(404)
                 }
             })
             .catch((err) => {
                 return reply(Http.internalServerError('an error has occurred', err)).code(500) 
             })
    },
    getById: (request, reply) => {
        Model.forge({ hash: request.params.hash })
             .fetch()
             .then((register) => {
                 if (register) {
                     return reply(Http.ok('successfully', register)).code(200)
                 } else {
                     return reply(Http.notFound('resource not found')).code(404)
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