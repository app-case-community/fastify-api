'use strict'
const fp = require('fastify-plugin');
const Sequelize = require('sequelize')

module.exports = fp(function (fastify, opts, next) {
  const services = {
    <% for(var i = 0; i < tables.length; i++){ %>
    <%=tables[i].Name %>: require('../services/{{ tables[i].Name }}')(Sequelize, fastify),
    <% } %>
  }
  fastify.decorate('services', services)
  next()
})
