'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gallery Schema
 */
 var PhotosSchema = new Schema({
 	photo_description: {
 		type: String,
 		default: '',
 		trim: true,
 	},
 	imagePath:{
 		type: String,
 		default: ''
 	}
 });

var GallerySchema = new Schema({
	// Gallery model fields
	// ...
	album_name: {
		type: String,
		default: '',
		trim: true
	},
	album_description: {
		type: String,
		default: '',
		trim: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	photos: [PhotosSchema]

});

mongoose.model('Gallery', GallerySchema,'gallery');
