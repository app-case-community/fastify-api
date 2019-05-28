'use strict'
const fp = require('fastify-plugin');
const Sequelize = require('sequelize')
module.exports = fp(function (fastify, opts, next) {
  const services = {
    book_category_mapping: require('../services/book_category_mapping')(Sequelize, fastify),
    category: require('../services/category')(Sequelize, fastify),
    evaluation_rule: require('../services/evaluation_rule')(Sequelize, fastify),
    holidays: require('../services/holidays')(Sequelize, fastify),
    lesson_evaluation: require('../services/lesson_evaluation')(Sequelize, fastify),
    lesson_monitor_resource: require('../services/lesson_monitor_resource')(Sequelize, fastify),
    lesson_schedule: require('../services/lesson_schedule')(Sequelize, fastify),
    options: require('../services/options')(Sequelize, fastify),
    teacher_schedule: require('../services/teacher_schedule')(Sequelize, fastify),
    time_quantum: require('../services/time_quantum')(Sequelize, fastify),
  }
  fastify.decorate('services', services)
  next()
})
