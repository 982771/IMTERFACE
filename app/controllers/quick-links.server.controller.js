'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	QuickLink = mongoose.model('QuickLink'),
    _= require('lodash');

		var multer = require('multer');
    var fs = require('fs');


		var storage = multer.diskStorage({ //multers disk storage settings
				destination: function (req, file, cb) {
						cb(null, '.\\public\\modules\\main\\dlc\\Induction_Material\\');
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

	var uploadPath = ".\\public\\modules\\main\\dlc\\Induction_Material\\";

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
/**
 * Create a Quick link
 */
exports.create = function(req, res) {
	var quicklink = new QuickLink(req.body);
	quicklink.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(quicklink);
		}
	});
};

/**
 * Show the current Quick link
 */
exports.read = function(req, res) {
	res.json(req.quicklink);
};

/**
 * Update a Quick link
 */
 exports.updateQuicklinks = function(req, res) {
  console.log(req.body);
  var temp = new QuickLink();
  _.extend(temp, req.body);
  QuickLink.update({"_id":temp._id},temp, function (err, result) {
 	 if (err) throw err;
  });
  res.json(temp);
 };

/**
 * Delete an Quick link
 */
 exports.deleteLink = function(req, res) {
 	var links = req.body;
 	QuickLink.remove({_id: req.body._id},function(err) {
 		if (err) {
 			return res.status(400).send({
 				message: errorHandler.getErrorMessage(err)
 			});
 		} else {
 			res.json(links);
 		}
 	});
 };

/**
 * List of Quicklinks
 */
exports.list = function(req, res) {
	QuickLink.find().exec(function(err, quicklinks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(quicklinks);
		}
	});
};

/**
 * Article middleware
 */
exports.quicklinkByID = function(req, res, next, id) {
	QuickLink.findById(id).populate('label', 'section_header').exec(function(err, quicklink) {
		if (err) return next(err);
		if (!quicklink) return next(new Error('Failed to load article ' + id));
		req.quicklink = quicklink;
		next();
	});
};
