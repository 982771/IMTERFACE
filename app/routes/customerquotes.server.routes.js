'use strict';

var customerquotes = require('../../app/controllers/customerquotes.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
		app.route('/customerquotes')
		.get(customerquotes.list)
		.post(customerquotes.create)
		.put(customerquotes.updateQuote);


		app.route('/mail-customerquotes')
		.post(customerquotes.sendMail);

		app.route('/customerquotes/:id')
		.put(customerquotes.delete);


		app.route('/customerquotes1/:id')
		.put(customerquotes.update);


};
