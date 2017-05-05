'use strict';

//QUicklinksservice used for communicating with the articles REST endpoints
angular.module('main').factory('QuickLinks', ['$resource',
	function($resource) {
		return $resource('quicklinks/:quicklinkId', {
			quicklinksId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);