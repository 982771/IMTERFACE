'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Poc Schema
 */
var PocSchema = new Schema({
	// Poc model fields   
	// ...
	title: {
		type: String,
		default: '',
		trim: true		
	},

	content: {
		type: String,
		trim: true,
		default: ''
	},

	desc: {
		type: String,
		trim: true,
		default: ''
	},

	by: {
		type: String,
		trim: true,
		default: ''
	},

	impact: {
		type: String,
		trim: true,
		default: ''
	},

	challenge: {
		type: String,
		trim: true,
		default: ''
	},

	solution: {
		type: String,
		trim: true,
		default: ''
	},

	results: {
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
	}

});

mongoose.model('Poc', PocSchema);