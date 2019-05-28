'use strict'

module.exports = function (fastify, opts, next) {
  fastify.get('/', async function (request, reply) {
    // const list = await fastify.services.category.findAll()
    const list = await fastify.services.holidays.findAll()
    reply.send({ root: true, list})
  })
  next()
}
