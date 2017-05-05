'use strict';

var gallery = require('../../app/controllers/gallery.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
	// gallery Routes
	app.route('/gallery')
		.get(gallery.list)
		.post(gallery.create)
		.delete(gallery.delete);


	app.route('/uploadGalleryImages')
		.post(gallery.uploadFile);


		app.route('/uploadGalleryImages/:id')
			.delete(gallery.deleteSinglePhoto);
};
