'use strict';

var successstories = require('../../app/controllers/successstories.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...

	app.route('/successstories')
		.get(successstories.list)
		.post(successstories.create)
		.delete(successstories.delete);

	app.route('/mail-successstories')
		.post(successstories.sendMail);


	app.route('/successstories/:successStoryId')
	 	.put(successstories.update);

};
