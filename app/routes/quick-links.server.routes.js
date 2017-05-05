'use strict';


var quicklinks = require('../../app/controllers/quick-links.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
	// Quicklink Routes
	app.route('/quicklinks')
		.get(quicklinks.list)
		.post(quicklinks.create)
		.put(quicklinks.updateQuicklinks)
		.delete(quicklinks.deleteLink);

	app.route('/upload')
		.post(quicklinks.uploadFile);

	// app.route('/quicklinks/:quicklinkId')
	// 	.get(quicklinks.read)
	// 	.put(quicklinks.update)
	// 	.delete(quicklinks.delete);

	// Finish by binding the article middleware
	app.param('quicklinkId', quicklinks.quicklinkByID);
};
