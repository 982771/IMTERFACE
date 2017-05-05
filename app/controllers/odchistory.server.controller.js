'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	OdcHistory = mongoose.model('Odchistory'),
    _= require('lodash');

/**
 * Create a Quick link
 */
exports.create = function(req, res) {

var odchistory = new OdcHistory(req.body);
	//article.user = req.user;

	odchistory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(odchistory);
		}
	});

};

/**
 * Show the current Quick link
 */
exports.read = function(req, res) {
	res.json(req.odchistory);
};

/**
 * Update a Quick link
 */
exports.update = function(req, res) {

};

/**
 * Delete an Quick link
 */
exports.delete = function(req, res) {

};

/**
 * List of Quicklinks
 */
exports.list = function(req, res) {
	console.log("Inside Odchistory");
	OdcHistory.find().exec(function(err, odchistory) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(odchistory);
			console.log(odchistory);
		}
	});
};

/**
 * Article middleware
 */
exports.quicklinkByID = function(req, res, next, id) {
	OdcHistory.findById(id).exec(function(err, odchistory) {
		if (err) return next(err);
		if (!odchistory) return next(new Error('Failed to load content for ' + id));
		req.odchistory = odchistory;
		next();
	});
};