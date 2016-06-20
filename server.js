'use strict'

const   Hapi        = require('hapi')
,       Server      = new Hapi.Server()

Server.connection({
    host: 'localhost',
    port: 9000
})

Server.route({
    method: 'GET',
    path: '/v1/crowley',
    handler: (request, reply) => {
        reply({
            crowley : 'See what I see. Feel what I feel. And lets go take a howl at that moon.'
        })
    }
})

Server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Server running at: ${ Server.info.uri } on ${ process.env.NODE_ENV } mode`)
})

