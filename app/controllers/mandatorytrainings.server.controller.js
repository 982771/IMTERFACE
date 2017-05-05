'use strict';

/**
 * Module dependencies.
 */
var express= require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Mandatorytraining = mongoose.model('Mandatorytraining'),
    _ = require('lodash');


/**
 * Create a Mandatorytraining
 */
//  console.log(Mandatorytraining);
exports.create = function(req, res) {
	var trainings = new Mandatorytraining(req.body);
	trainings.save(function(err){
		if(err) throw err;
	});
	res.json(trainings);
};


/**
 * Show the current Mandatorytraining
 */
exports.read = function(req, res) {

};

/**
 * Update a Mandatorytraining
 */
 exports.updateMandatoryTrainings = function(req, res) {
 	console.log(req.body);
 	var temp = new Mandatorytraining();
 	_.extend(temp, req.body);
 	Mandatorytraining.update({"_id":temp._id},temp, function (err, result) {
 	  if (err) throw err;
 	});
 	res.json(temp);
 };

/**
 * Delete an Mandatorytraining
 */
exports.deleteTraining = function(req, res) {
	var trainings = req.body;
	Mandatorytraining.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(trainings);
		}
	});
};

/**
 * List of Mandatorytrainings
 */
exports.list = function(req, res) {
	Mandatorytraining.find().exec(function(err, mandatetrainings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(mandatetrainings);
		}
	});
};
