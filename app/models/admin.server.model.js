'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var AdminSchema = new Schema({
	fmno: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: ''
	}
});

mongoose.model('Admin', AdminSchema, 'admin');
