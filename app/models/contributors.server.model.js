'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ContributorSchema = new Schema({
	username: {
		type: String,
  	default: '',
    trim: true
	},
	imagePath: {
		type: String,
		default: '',
		trim: true
	},
  userDescription:{
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Contributor', ContributorSchema);
