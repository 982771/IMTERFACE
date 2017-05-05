'use strict';

var employees = require('../../app/controllers/employees.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...

	app.route('/employees')
		.get(employees.list)
		.put(employees.update)
		.post(employees.create)
		.delete(employees.delete)

};