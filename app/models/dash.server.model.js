'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OptionSchema = new Schema({
	option_text: {
		type: String,
		default: '',
		trim: true,
		required: 'option text cannot be blank'
	},
	count: {
		type: Number,
		default: 0
	}
});

var PollSchema = new Schema({
	question: {
		type: String,
		default: '',
		trim: true,
		required: 'Question cannot be blank'
	},
	isActive: {
		type: Boolean,
		default: false
	},
	choices:  [OptionSchema],
	empIds: {
		type: [Number]
	}
});

var NewsSchema = new Schema({
	eventText: {
		type: String,
		default: '',
		trim: true,
		required: 'Event cannot be blank'
	},
	type: {
		type: String,
		default: ''
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: Date.now
	},
	priority: {
		type: String,
		trim: true,
		default: ''
	}

});

mongoose.model('Poll', PollSchema,"Polls");

mongoose.model('News',NewsSchema, "News");
