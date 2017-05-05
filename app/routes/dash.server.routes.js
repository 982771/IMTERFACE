'use strict';

var poll = require('../../app/controllers/dash.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
		app.route('/mail')
		.post(poll.sendMail);

		app.route('/poll')
		.get(poll.listPoll)
		.post(poll.createPoll)
		.put(poll.updatePoll)
		.delete(poll.deletePoll);


		app.route('/events')
		.get(poll.listEvents)
		.post(poll.createEvents)
		.put(poll.updateEvents)
		.delete(poll.deleteEvents);

		app.route('/uploadEvent')
			.post(poll.uploadFile);

		app.route('/allevents')
		.get(poll.listAllEvents)

		/*app.route('/events/:eventid')
		.delete(poll.deleteEvents);*/

};
