'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Pocs = mongoose.model('Poc'),
    _ = require('lodash');

    var mail = require('./../services/mail.js');

/**
 * Create a Poc
 */
exports.create = function(req, res) {

	var quotes = new Pocs(req.body);
	quotes.save(function(err){
		if(err) throw err;
	});
	res.json(quotes);

};

/**
 * Show the current Poc
 */
exports.read = function(req, res) {

};

/**
 * Update a Poc
 */
exports.update = function(req, res) {
	console.log(req.body)
	Pocs.findOneAndUpdate({ _id: req.params.pocId },req.body, {upsert:true}, function(err, doc){
   		if(err) throw err;
	});
	//res.json(req.body);
	res.send(req.body);
};

/**
 * Delete an Poc
 */
exports.delete = function(req, res) {

};

/**
 * List of Pocs
 */
exports.list = function(req, res) {
	Pocs.find().exec(function(err, pocs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(pocs);
		}
	});
};

exports.sendMail = function(req, res){
console.log(res);
	var mailFrom = req.body.emailId;
	var mailTo = ["interface_team@mckinsey.com","Mathew_Vadakkencheril@external.mckinsey.com", "dipen_shah@external.mckinsey.com"];
	var mailSubject = "<ODC-Interface>: Success Story";
	var text = req.body.by+" has submitted the following pocs on "+req.body.successdate.split("T")[0]+" :\n\n"+
     "Title : "+req.body.title+" \nAbstract : "+req.body.desc+" \nContent : "+req.body.content;
	var mailBody = text;
	var result = mail.sendMail(mailFrom, mailTo, mailSubject, mailBody);

	res.json(result);
};
