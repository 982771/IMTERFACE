'use strict';

var contributors = require('../../app/controllers/contributors.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
		app.route('/contributors')
		.get(contributors.list)
		.post(contributors.create)
		.put(contributors.updateContributors)
		.delete(contributors.deleteContributors);

		app.route('/contriupload')
			.post(contributors.uploadFile);

};
