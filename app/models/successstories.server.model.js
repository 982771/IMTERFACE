'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Successstories Schema
 */
var SuccessstoriesSchema = new Schema({
	// Successstories model fields   
	// ...
	by: {
		type: String,
		trim: true,
		default: ''
	},

	title: {
		type: String,
		trim: true,
		default: ''
	},

	successdate: {
		type: Date,
		trim: true,
		default: Date.now
	},

	created_at: {
		type: Date,
		default: ''
	},
	
	updated_at: {
		type: Date,
		default: ''
	},
	
	content: {
		type: String,
		trim: true,
		default: ''
	},

	problem: {
		type: String,
		trim: true,
		default: ''
	},

	approach: {
		type: String,
		trim: true,
		default: ''
	},

	impact: {
		type: String,
		trim: true,
		default: ''
	}	
});

mongoose.model('Successstory', SuccessstoriesSchema);