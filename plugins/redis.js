'use strict'
const config = require('../config')
const fp = require('fastify-plugin')
module.exports = fp(function (fastify, opts, next) {
  fastify.register(require('fastify-redis'), config.redis)
  next()
})
