'use strict'

const code = {
    ok: 200,
    created: 201,
    notFound: 404,
    internalServerError: 500
}

const status = {
    ok: 'Ok',
    created: 'Created',
    notFound: 'NotFound',
    internalServerError: 'InternalServerError'   
}

class Http {
    constructor(code, status, message, data) {
        this.code = code
        this.status = status
        this.message = message
        this.data = data
    }
}

exports.created = (message, data) => {
    return new Http(code.created, status.created, message, data)
}

exports.ok = (message, data) => {
    return new Http(code.ok, status.ok, message, data)
}

exports.notFound = (message) => {
    return new Http(code.notFound, status.notFound, message)
}

exports.internalServerError = (message, data) => {
    return new Http(code.internalServerError, status.internalServerError, message, data)
}