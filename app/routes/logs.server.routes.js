'use strict';

var logs = require('../../app/controllers/logs.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...

	app.route('/logs')
		.get(logs.list)
		.post(logs.create);


};
