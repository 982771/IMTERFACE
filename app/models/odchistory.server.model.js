'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Odchistory Schema
 */
var OdchistorySchema = new Schema({
	// Odchistory model fields   
	// ...
		contentyear: {
		type: String,
		default: '',
		trim: true,
		required:'Link label is required'
	},
	contenthtml: {
		type: String,
		trim: true,
		default: ''		
	},
	imagepath: {
		type: String,
		trim: true,
		default: ''
		
	}
});

mongoose.model('Odchistory', OdchistorySchema, 'odchistory');