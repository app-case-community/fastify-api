'use strict'

const fastify = require('fastify')({
    logger: {
        level: 'info',
        file: require('path').resolve(__dirname, './logs/logger.log')
    }
})

fastify.register(require('./app'))

// Run the server!
fastify.listen(3000, '0.0.0.0')
    .then((address) => console.log(`server listening on ${address}`))
    .catch(err => {
        console.log('Error starting server:', err)
        process.exit(1)
    })
