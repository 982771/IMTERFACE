'use strict';

var mandatorytrainings = require('../../app/controllers/mandatorytrainings.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
		app.route('/mandatorytrainings')
		.get(mandatorytrainings.list)
		.post(mandatorytrainings.create)
		.put(mandatorytrainings.updateMandatoryTrainings)
		.delete(mandatorytrainings.deleteTraining);
};
