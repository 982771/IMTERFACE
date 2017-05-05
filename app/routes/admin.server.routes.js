'use strict';

var admin = require('../../app/controllers/admin.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...

	app.route('/admins')
		.get(admin.list)
		.post(admin.create)
		.put(admin.update)
		.delete(admin.delete);


};
