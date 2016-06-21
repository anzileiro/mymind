'use strict'

const   Hapi                = require('hapi')
,       Server              = new Hapi.Server()
,       NoteRoute           = require('./routes/note.js')

Server.connection({
    host: process.env.WEBAPI_HOST,
    port: process.env.WEBAPI_PORT
})

Server.route(NoteRoute)

Server.start((err) => {
    if (err) {
        throw err
    }
    console.log(`Server running at: ${ Server.info.uri } on ${ process.env.NODE_ENV } mode`)
})

