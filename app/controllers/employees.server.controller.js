'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
errorHandler = require('./errors.server.controller'),
	Employee = mongoose.model('Employee'),
    _ = require('lodash');

/**
 * Create a Employee
 */
exports.create = function(req, res) {
	var emp = new Employee(req.body);
	emp.save(function (error, employee) {
		if(error) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(error)
			});
			
		}
		else {
			res.json(employee);
		}
	});

};

/**
 * Show the current Employee
 */
exports.read = function(req, res) {

};

/**
 * Update a Employee
 */
exports.update = function(req, res) {
	var emp = new Employee(req.body);
	emp.update(emp, function (error, employee) {
		if(error) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(error)
			});
		}
		else {
			res.json(employee);
		}
	})		// res.json(emp);	
};

/* Save an Employee*/

exports.save = function (req, res) {
	var emp = new Employee(req.body);
	var sendError = function (error) {
		return res.status(400).send({
			message: errorHandler.getErrorMessage(error)
		});
	}
	if(emp["_id"]) {
		emp.update(emp, function (err, employee) {
			if(err) {
				sendError(err);
			}
			else {
				res.json(employee);
			}
		})
	}
	else{
		emp.save(function (err, employee) {
			console.log(employee);
			if(err) {
				sendError(err);
				
			}
			else {
				res.json(employee);
			}
		});
	}
};

/**
 * Delete an Employee
 */
exports.delete = function(req, res) {
};

/**
 * List of Employees
 */
exports.list = function(req, res) {

	Employee.find().exec(function(err, employees) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(employees);
		}
	});

};