'use strict';

/**
 * Module dependencies.
 */
var express= require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Contributors = mongoose.model('Contributor'),
    _ = require('lodash');


		var multer = require('multer');
		var fs = require('fs');


		var storage = multer.diskStorage({ //multers disk storage settings
				destination: function (req, file, cb) {
						cb(null, './public/modules/main/img/profile/');
				},
				filename: function (req, file, cb) {
					console.log(file);
						var datetimestamp = Date.now();
					  //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
						cb(null,file.originalname);

				}
		});

				var upload = multer({ //multer settings
												storage: storage
										}).single('file');


exports.create = function(req, res) {
	var contris = new Contributors(req.body);
	contris.save(function(err){
		if(err) throw err;
	});
	res.json(contris);
};


exports.read = function(req, res) {

};

exports.uploadFile = function(req, res){

	var uploadPath = "./public/modules/main/img/profile/";

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
			//console.log(req.file);
	            if(err){
	                 res.json({error_code:1,err_desc:err});
	                 return;
	            }
								console.log(req.file);
	             res.json({error_code:0,err_desc:null,file:req.file});
	      });
	}

};

 exports.updateContributors = function(req, res) {
 	console.log(req.body);
 	var temp = new Contributors();
 	_.extend(temp, req.body);
 	Contributors.update({"_id":temp._id},temp, function (err, result) {
 	  if (err) throw err;
 	});
 	res.json(temp);
 };


exports.deleteContributors = function(req, res) {
	var contris = req.body;
	Contributors.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contris);
		}
	});
};


exports.list = function(req, res) {
	Contributors.find().exec(function(err, contris) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(contris);
		}
	});
};
