'use strict';

angular.module('main').factory('CustomerQuotes', ['$resource',
	function($resource) {
		return $resource('customerQuotes/:quoteslinkByID', {
			quoteslinkByID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);