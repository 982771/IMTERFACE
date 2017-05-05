'use strict';

/**
 * Module dependencies.
 */
var express= require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Customerquote = mongoose.model('Customerquote'),
    _ = require('lodash');

var mail = require('./../services/mail.js');

app.use(bodyParser.json());
/**
 * Create a Customerquote
 */
//  console.log(Customerquote);
exports.create = function(req, res) {
	var quotes = new Customerquote(req.body);
	quotes.save(function(err){
		if(err) throw err;
	});
	res.json(quotes);
};


/**
 * Show the current Customerquote
 */
exports.read = function(req, res) {

};

/**
 * Update a Customerquote
 */
exports.update = function(req, res) {
	console.log("Inside Customer Quotes Update");
	console.log(req.body)
	Customerquote.findOneAndUpdate({ _id: req.params.id },req.body, {upsert:true}, function(err, doc){
   		if(err) throw err;
	});
	//res.json(req.body);
	res.send(req.body);
};

exports.updateQuote = function(req, res) {	
	var quote = new Customerquote();
	_.extend(quote, req.body);
	quote.update(quote, function(err){
		if(err) throw err;
	});
	res.json(quote);
};

/**
 * Delete an Customerquote
 */
exports.delete = function(req,res){
	//console.log(req.body);
	var id=req.body._id;
	console.log(id);
	var comment_id=req.params.id;
	console.log(comment_id);
	var quote = new Customerquote();
	//console.log(req.body);
	console.log(req.body.by);

	quote.update(
        req.body,
        {$pull: {comments: { _id: comment_id}}},
        function (err, user) {
            if (err) {
                res.send(err);
            }
        res.send(quote);
        });
};

/**
 * List of Customerquotes
 */
exports.list = function(req, res) {
	Customerquote.find().exec(function(err, mystories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(mystories);
		}
	});
};

exports.sendMail = function(req, res){
	var mailFrom = req.body.emailId;
	var mailTo = ["interface_team@mckinsey.com","Mathew_Vadakkencheril@external.mckinsey.com", "dipen_shah@external.mckinsey.com"];
	var mailSubject = "<ODC-Interface>: Customer Quotes";
	var text = req.body.by+" has submitted the following customer quote for "+req.body.to+" on "+req.body.date.split("T")[0]+" :\n\n"+ req.body.description;

	var mailBody = text;
	var result = mail.sendMail(mailFrom, mailTo, mailSubject, mailBody);
	res.json(result);
};
