'use strict'

const codes = {
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
        this.message = message || undefined
        this.data = data || undefined
    }
}

exports.ok = (message, data) => {
    return new Http(codes.ok, status.ok, message, data)
}

exports.created = (message, data) => {
    return new Http(codes.created, status.created, message, data)
}

exports.notFound = (message, data) => {
    return new Http(codes.notFound, status.notFound, message, data)
}

exports.internalServerError = (message, data) => {
    return new Http(codes.internalServerError, status.internalServerError, message, data)
}

