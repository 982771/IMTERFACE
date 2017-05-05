'use strict';

var odchistory = require('../../app/controllers/odchistory.server.controller');

module.exports = function(app) {
	// Routing logic   
	app.route('/odchistory')
		.get(odchistory.list)
		.post(odchistory.create);

	app.route('/odchistory/:odchistoryId')
		.get(odchistory.read)
		.put(odchistory.update)
		.delete(odchistory.delete);

	// Finish by binding the article middleware
	//app.param('quicklinkId', quicklinks.quicklinkByID);
};