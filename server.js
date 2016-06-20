'use strict'

const   Hapi                = require('hapi')
,       Server              = new Hapi.Server()
,       NoteController      = require('./controllers/note.js')

Server.connection({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
})

Server.route(NoteController.routes)

Server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Server running at: ${ Server.info.uri } on ${ process.env.NODE_ENV } mode`)
})

