'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Log Schema
 */
var LogSchema = new Schema({
	created_at: {
		type: Date,
		default: Date.now
	},
	fmno: {
		type: String,
		default: '',
		trim: true
	},
	username: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Log', LogSchema, 'Logs');