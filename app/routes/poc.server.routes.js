'use strict';
var pocs = require('../../app/controllers/poc.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...
	app.route('/pocs')
		.get(pocs.list)
		.post(pocs.create);

	app.route('/mail-pocs')
	.post(pocs.sendMail);

	app.route('/pocs/:pocId')
	 	.put(pocs.update);

};