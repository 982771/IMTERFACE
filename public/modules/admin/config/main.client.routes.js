'use strict';

//Setting up route
angular.module('admin').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		var baseURL = 'modules/admin/views/';
		// Users state routing
		$stateProvider
		.state('admin', {
			url: '/admin',
			templateUrl: baseURL + 'admin.client.view.html' 
		})
	}
]);