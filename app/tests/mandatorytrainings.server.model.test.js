'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mandatorytrainings = mongoose.model('Mandatorytrainings');

/**
 * Globals
 */
var user, mandatorytrainings;

/**
 * Unit tests
 */
describe('Mandatorytraining Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			mandatorytrainings = new Mandatorytrainings
	({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return mandatorytrainings.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Mandatorytrainings
.remove().exec();
		User.remove().exec();

		done();
	});
});