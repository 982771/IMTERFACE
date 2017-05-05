'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/* Mandatory Trainings Schema*/

var MandatorytrainingsSchema = new Schema({
	// MandatoryTrainings model fields   
	// ...
	name: {
		type: String,
		trim: true,
		default: ''
	},
	link: {
		type: String,
		trim: true,
		default: ''
	},
	priority: {
		type: String,
		trim: true,
		default: ''
	},
	created_at: {
		type: Date,
		default: ''
	}
})
mongoose.model('Mandatorytraining', MandatorytrainingsSchema);