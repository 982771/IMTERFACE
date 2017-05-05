'use strict';

//Setting up route
angular.module('main').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		// $urlRouterProvider.when('/', '/main');
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Main state routing
		$stateProvider.
		state('inductionmaterial', {
			url: '/inductionmaterial',
			templateUrl: 'modules/main/views/inductionmaterial.client.view.html'
		}).
		state('successstories', {
			url: '/successstories',
			templateUrl: 'modules/main/views/successstories.client.view.html'
		}).
		state('history', {
			url: '/history',
			templateUrl: 'modules/main/views/history.client.view.html'
		}).
		state('dashboard', {
			url: '/',
			templateUrl: 'modules/main/views/dashboard.client.view.html' 

		}).
		state('addlist', {
	        url: '/addlist',
	        templateUrl: 'modules/main/views/customer-quotes.client.view.html'
        }).
        state('mandatoryTrainings', {
			url: '/mandatoryTrainings',
			templateUrl: 'modules/main/views/mandatorytrainings.client.view.html'
		}).
		state('customerQuotes', {
			url: '/customerQuotes',
			templateUrl: 'modules/main/views/customer-quotes.client.view.html'
		}).
		state('odcMap', {
			url: '/odcmap',
			templateUrl: 'modules/main/views/odcmap.client.view.html'
		}).
		state('pocs', {
			url: '/pocs',
			templateUrl: 'modules/main/views/pocs.client.view.html'
		}).
		/*no controllers created for the below links*/
		state('thankyouThursday', {
			url: '/thankyouthursday',
			templateUrl: 'modules/main/views/thankyou-thursday.client.view.html'
		}).
		state('globalFootprint', {
			url: '/globalfootprint',
			templateUrl: 'modules/main/views/global-footprint.client.view.html'
		}).
		state('gallery', {
			url: '/gallery',
			templateUrl: 'modules/main/views/gallery.client.view.html'
		}).
		state('calendar', {
			url: '/calendar',
			templateUrl: 'modules/main/views/calendar.client.view.html'
		}).		
		state('contributors', {
			url: '/contributors',
			templateUrl: 'modules/main/views/contributors.client.view.html'
		}).	
		state('wip', {
			url: '/wip',
			templateUrl: 'modules/main/views/wip.client.view.html'
		});
	}
]);