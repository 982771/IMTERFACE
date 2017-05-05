'use strict';

angular.module('main').factory('pocs', ['$resource',
	function($resource) {
		return $resource('pocs/:pocsByID', {
			storieslinkByID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);