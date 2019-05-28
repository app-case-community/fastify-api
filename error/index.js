const errorCode = require('./error')
module.exports = (error, request, reply) => {
    var errorName = error.name
    var statusCode = error.statusCode || 500
    reply.code(statusCode).type('application/json; charset=utf-8')
    if (statusCode >= 500) {
        request.log.error(error)
        switch (errorName) {
            case 'SequelizeDatabaseError':
            case 'SequelizeConnectionRefusedError':
            case 'SequelizeConnectionError':
                reply.send({
                    statusCode,
                    ...errorCode.SEQUELIZE_CONNECT_ERROR
                })
                break
            default:
                reply.send({
                    statusCode,
                    error: 'Internal server error',
                    name: errorName,
                    message: error.message
                })
                break
        }
    } else if (statusCode >= 400) {
        request.log.info(error)
        reply.send({
            statusCode,
            error: 'Internal server error',
            name: errorName,
            message: error.message
        })
    } else {
        request.log.error(error)
        reply.send({
            statusCode,
            error: 'Internal server error',
            name: errorName,
            message: error.message
        })
    }
}