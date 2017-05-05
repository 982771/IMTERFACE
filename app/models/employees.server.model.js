'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
	Desk: {
		type: String,
		default: '',
	},
	Name: {
		type: String,
		default: '',
	},
	Extn: {
		type: String,
		default: '',
	},
	"FMNO": {
		type: String,
		default: '',
	},
	"Project Pool": {
		type: String,
		default: '',
	},
	Role: {
		type: String,
		default: '',
	},
	"Skill/Technology": {
		type: String,
		default: '',
	},
	"Primary Project": {
		type: String,
		default: '',
	},
	"Secondary Project": {
		type: String,
		default: '',
	},
	"Tech Group": {
		type: String,
		default: '',
	},
	"Image": {
		type: String,
		default: 'modules/main/img/icon_user.png',
	},
	Email: {
		type:String,
		default: '',
	},
	Location: {
		type:String,
		default:''
	}

});

mongoose.model('Employee', EmployeeSchema, 'Employees');