'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Log Schema
 */
var DownloadsSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
	category: {
		type: String,
		default: '',
		trim: true
	},
	username: {
		type: String,
		default: '',
		trim: true
	},
  downloaded_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Downloads', DownloadsSchema, 'Downloads');
