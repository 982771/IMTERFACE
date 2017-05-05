'use strict';

var downloads = require('../../app/controllers/downloads.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...

	app.route('/downloads')
		.get(downloads.list)
		.post(downloads.create);


};
