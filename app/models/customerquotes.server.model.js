'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentLikesSchema = new Schema({
	fmno:{
		type: Number
	},
	name:{
		type: String,
		default: ''
	}
});

var LikesSchema = new Schema({
	fmno:{
		type: Number
	},
	name:{
		type: String,
		default: ''
	}
});

var CommentSchema = new Schema({
	comment: {
		type: String,
		default: '',
		trim: true,
		required: 'comment cannot be blank'
	},
	created_at: {
		type: Date,
		default: ''
	},
	comment_likes:[CommentLikesSchema],

	created_by:{
		type: String,
		default: ''
	}
});

/**
 * Customerquotes Schema
 */
var CustomerquotesSchema = new Schema({
	// Customerquotes model fields
	// ...
	by: {
		type: String,
		trim: true,
		default: ''
	},

	to: {
		type: String,
		trim: true,
		default: ''
	},

	description: {
		type: String,
		trim: true,
		default: ''
	},

	date: {
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

	likes:[LikesSchema],
	comments:[CommentSchema]
});

mongoose.model('Customerquote', CustomerquotesSchema);
