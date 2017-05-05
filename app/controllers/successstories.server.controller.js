'use strict';

/**
 * Module dependencies.
 */
var express= require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Successstory = mongoose.model('Successstory'),
    _ = require('lodash');

var mail = require('./../services/mail.js');

 app.use(bodyParser.json());

/**
 * Create a Successstory
 */
exports.create = function(req, res) {

	var quotes = new Successstory(req.body);
	quotes.save(function(err){
		if(err) throw err;
	});
	res.json(quotes);
 };

/**
 * Show the current Successstory
 */
exports.read = function(req, res) {

};

/**
 * Update a Successstory
 */
exports.update = function(req, res) {
	console.log(req.body)
	Successstory.findOneAndUpdate({ _id: req.params.successStoryId },req.body, {upsert:true}, function(err, doc){
   		if(err) throw err;
	});
	//res.json(req.body);
	res.send(req.body);
};

/**
 * Delete an Successstory
 */
exports.delete = function(req, res) {
	var SuccessStory1 = req.body;
	Successstory.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(SuccessStory1);
		}
	});
};

/**
 * List of Successstories
 */
exports.list = function(req, res) {
	Successstory.find().exec(function(err, Successstory) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(Successstory);
		}
	});

};

exports.sendMail = function(req, res){
	var mailFrom = req.body.emailId;
	var mailTo = ["interface_team@mckinsey.com", "Mathew_Vadakkencheril@external.mckinsey.com", "dipen_shah@external.mckinsey.com"];
	var mailSubject = "<ODC-Interface>: Success Story";
	var text = req.body.by+" has submitted the following success story on "+req.body.successdate.split("T")[0]+" :\n\n"+
     "Title : "+req.body.title+" \nContent : "+req.body.content+" \nProblem : "+req.body.problem+" \nApproach : "+req.body.approach+" \nImpact : "+req.body.impact;
	var mailBody = text;
	var result = mail.sendMail(mailFrom, mailTo, mailSubject, mailBody);

	res.json(result);
};
