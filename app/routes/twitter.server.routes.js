'use strict';

var twitter = require('../../app/controllers/twitter.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...
	app.route('/twitter')
		.get(twitter.read);
};