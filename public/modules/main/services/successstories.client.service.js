'use strict';

angular.module('main').factory('SuccessStories', ['$resource',
	function($resource) {
		return $resource('successstories/:storieslinkByID', {
			storieslinkByID: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);