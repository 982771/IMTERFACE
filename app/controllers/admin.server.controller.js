'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Admin = mongoose.model('Admin'),
    _ = require('lodash');

/**
 * Create a Employee
 */
exports.create = function(req, res) {
	var admin = new Admin(req.body);
	admin.save(function (error, admins) {
		if(error) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(error)
			});

		}
		else {
			res.json(admins);
		}
	});

};

exports.delete = function(req, res) {
	var admins = req.body;
	Admin.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(admins);
		}
	});
};

exports.update = function(req, res) {
	var temp = new Admin();
	_.extend(temp, req.body);
	Admin.update({"_id":temp._id},temp, function (err, result) {
	  if (err) throw err;
	});
	res.json(temp);
};

exports.list = function(req, res) {

	Admin.find().exec(function(err, admins) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(admins);
			console.log(admins);
		}
	});

};
