'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * QuickLinks Schema
 */
var QuickLinksSchema = new Schema({
	// QuickLinks model fields   
	// ...
	label: {
		type: String,
		default: '',
		trim: true,
		required:'Link label is required'
	},
	section_header: {
		type: String,
		trim: true,
		default: ''
		
		
	},
	docpath: {
		type: String,
		trim: true,
		default: ''
		
	}
});

mongoose.model('QuickLink', QuickLinksSchema);