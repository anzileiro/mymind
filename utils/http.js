'use strict'

exports.created = (message, data) => {
    return {
        code: 201,
        status: 'Created',
        message: message || 'HTTP Created Method',
        data: data || {}
    }
}

exports.ok = (message, data) => {
    return {
        code: 200,
        status: 'Ok',
        message: message || 'HTTP Ok Method',
        data: data || {}
    }
}

exports.internalServerError = (message, data) => {
    return {
        code: 500,
        status: 'InternalServerError',
        message: message || 'HTTP InternalServerError Method',
        data: data || {}
    }
}