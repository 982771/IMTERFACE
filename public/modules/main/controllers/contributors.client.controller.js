'use strict';

angular.module('main')
	.controller('ContributorController', ['$http', '$scope',
		function($http, $scope) {
			// Controller Logic
		//	alert('Hi');
			$scope.contributors_managers = [];
			$scope.contributors_developerux = [];
			$scope.contributors_developerdba = [];
			$scope.contributors_developerui = [];
			$scope.contributors_solutionarchtitect = [];
			$scope.contributors_specialconti = [];
			$scope.others = [];
			//$scope.contributors_developerux = [];

			$http.get('/contributors').success(function(response){

				 for (var i = 0; i < response.length;i++)
				 {
					 switch (response[i].userDescription)
					 {
						 case "Product Manager" :
						 $scope.contributors_managers.push(response[i]);
						 break;

						 case "Developer + UX" :
						 $scope.contributors_developerux.push(response[i]);
						 break;

						 case "Developer + DBA" :
						 $scope.contributors_developerdba.push(response[i]);
						 break;

						 case "UI Developer" :
						 $scope.contributors_developerui.push(response[i]);
						 break;

						 case "Solution Architect" :
						 $scope.contributors_solutionarchtitect.push(response[i]);
						 break;

						 case "Special Contribution" :
						 $scope.contributors_specialconti.push(response[i]);
						 break;

						 default :
						 $scope.others.push(response[i]);
						 }
					 }
					 console.log ($scope.contributors_managers.length);
					 console.log($scope.contributors_developerux.username);
					 console.log($scope.contributors_developerdba.username);
			});
		}
	]);
