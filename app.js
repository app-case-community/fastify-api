'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function (fastify, opts, next) {

	fastify.register(require('./middleware'))

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins')
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: {}
	});

	fastify.setErrorHandler(require('./error'))

	fastify.ready(() => {
		console.log("============================");
		console.log(fastify.printRoutes());
		console.log("============================");
	});

	next();
};
