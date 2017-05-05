'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Log = mongoose.model('Log'),
	_ = require('lodash');

/**
 * Create a log
 */
exports.create = function(req, res) {
	var log = new Log(req.body);

	log.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(log);
		}
	});
};

/**
 * List of Logs
 */
exports.list = function(req, res) {
	console.log("Inside Log");
	Log.find().exec(function(err, logs) {
		console.log(logs);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(logs);
		}
	});
};
