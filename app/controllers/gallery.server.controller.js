'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Gallery = mongoose.model('Gallery'),
    _= require('lodash');
		var multer = require('multer');
		var fs = require('fs');


var storage = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
				cb(null, './public/modules/main/img/gallery/');
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
	console.log(req);
	var uploadPath = "./public/modules/main/img/gallery/";

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

}

/**
 * Create a Gallery
 */
exports.create = function(req, res) {
	var gallery = new Gallery(req.body);
	console.log(req.body);
	gallery.save(function(err){
		if(err) throw err;
	});
	res.json(gallery);
};

/**
 * Show the current Gallery
 */
exports.read = function(req, res) {

};

/**
 * Update a Gallery
 */
exports.update = function(req, res) {

};

/**
 * Delete an Gallery
 */
exports.delete = function(req, res) {
	var gallery = req.body;
	Gallery.remove({_id: req.body._id},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			Gallery.find().exec(function(err, gallery) {
				res.json(gallery);
			});
		}
	});

};

/**
 * List of Galleries
 */
exports.list = function(req, res) {
	Gallery.find().exec(function(err, gallery) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(gallery);
		}
	});
};

exports.deleteSinglePhoto = function(req, res){
	Gallery.update({_id: req.params.id},
		  { $pull: { 'photos': {_id : req.body._id } } }, function(err){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
				else{
					Gallery.find().exec(function(err, gallery) {
						res.json(gallery);
					});
				}

			});
}
