'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Downloads = mongoose.model('Downloads'),
	_ = require('lodash');

/**
 * Create a log
 */
exports.create = function(req, res) {
	var downloads = new Downloads(req.body);

	downloads.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(downloads);
		}
	});
};

/**
 * List of Downloads
 */
exports.list = function(req, res) {
	console.log("Inside Downloads");
	Downloads.find().exec(function(err, downloads) {
		console.log(downloads);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(downloads);
		}
	});
};

// exports.aggregateODC = function(req,res) {
// 	console.log("Inside Downloads Aggregate");
// 	Downloads.aggregate([
// 		{ $match: {category:'$ODC INDUCTION'}
//  	 },
// 		{ $group:
//  		 { _id: '$name', total_products: { $sum: 1 } }
//  	 }
// 	]
// 	 ,function (err, res) {
// 		 if (err) return handleError(err);
// 		 console.log(res);
//   }
//  );
// };
