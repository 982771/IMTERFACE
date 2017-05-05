'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Poll = mongoose.model('Poll'),
	Events = mongoose.model('News'),
    _= require('lodash');
var mail = require('./../services/mail.js');

var multer = require('multer');
var fs = require('fs');

var Mongonaut = require('mongonaut');


var storage = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
				cb(null, './public/modules/main/dlc/Event/');
		},
		filename: function (req, file, cb) {
			console.log(file);
				var datetimestamp = Date.now();
			 // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
				cb(null,file.originalname);

		}
});

var upload = multer({ //multer settings
								storage: storage
						}).single('file');


//Upload File

exports.uploadFile = function(req, res){

	var uploadPath = "./public/modules/main/dlc/Event/";

	checkUploadPath(req, res);

	function checkUploadPath(req, res) {
			 fs.exists(uploadPath, function(exists) {
					if(!exists){
						fs.mkdir(uploadPath, function(err) {
							if(err) {
								console.log('Error in folder creation');
							}
						})
					}
					callUpload();
			 })
	}

	function callUpload(){
		upload(req,res,function(err){
						if(err){
								 res.json({error_code:1,err_desc:err});
								 return;
						}
							console.log(req.file);
						 res.json({error_code:0,err_desc:null,file:req.file});
			});
	}

	let mongonaut = new Mongonaut({
		'db': 'ODC_Nav_Dev',
		'collection': 'News'
	});

//Step 1
//read the csv file
// for each row, create new Events and then save it

//Step2
// clubbing save

	//pass a path to data file
	mongonaut.import('./public/modules/main/dlc/Event/MainTemplate.csv')
	.then(function(response){
		Events.find().exec(function(err,data){

			_.forEach(data, function(event){
					event.startDate = new Date(event.startDate).toISOString();
					Events.findOneAndUpdate({ _id: event._id },event, function(err, doc){
							if(err) throw err;
					});
			});


		});
	})
};
/**
 * Create a Poll
 */
exports.createPoll = function(req, res) {
	console.log(req.body);
	var polls = new Poll(req.body);
	polls.save(function(err){
		if(err) throw err;
	});
	res.json(polls);
};

/**
 * Show the current Poll
 */
exports.readPoll = function(req, res) {

};

/**
 * Update a Poll
 */
//Example of Model#update
exports.updatePoll = function(req, res) {
	var temp = new Poll();
	_.extend(temp, req.body);
	Poll.update({"_id":temp._id},temp, function (err, result) {
	  if (err) throw err;
	});

/*	//Example of Document#update
    temp.update(temp, function (err, result) {
	  if (err) throw err;
	});*/
	res.json(temp);
};


/**
 * Delete a Poll
 */
exports.deletePoll = function(req, res) {
	var polls = req.body;
	Poll.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(polls);
		}
	});
};


/**
 * List of Polls
 */
exports.listPoll = function(req, res) {

	Poll.find().exec(function(err, polldata) {
		console.log(polldata);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(polldata);
		}
	});

};

exports.listEvents = function(req, res) {

	var currentDate = new Date().toISOString().split("T")[0];
	var currentISODate = new Date(currentDate).toISOString();

	Events.find({"startDate": {$lte: currentDate}, "endDate": {$gte: currentDate}})
	.exec(function(err, eventsdata) {
		console.log(eventsdata);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(eventsdata);
		}
	});

};

exports.listAllEvents = function(req, res) {

	Events.find().exec(function(err, eventsdata) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
				res.json(eventsdata);
		}
	});

};




exports.createEvents = function(req, res) {
	var events = new Events(req.body);
	events.save(function(err){
		if(err) throw err;
	});
	res.json(events);
};

exports.updateEvents = function(req, res) {
	console.log(req.body);
	var temp = new Events();
	_.extend(temp, req.body);
	Events.update({"_id":temp._id},temp, function (err, result) {
	  if (err) throw err;
	});
	res.json(temp);
};

/**
 * Delete Events
 */
exports.deleteEvents = function(req, res) {
	var events = req.body;
	Events.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(events);
		}
	});
};


exports.sendMail = function(req, res){
	var mailFrom = req.body.emailId;
	var mailTo = ["interface_team@mckinsey.com"];
	var mailSubject = "<ODC-Interface>:User Feedback";
	var mailBody = req.body.text;
	var result = mail.sendMail(mailFrom, mailTo, mailSubject, mailBody);
	res.json(result);
};
