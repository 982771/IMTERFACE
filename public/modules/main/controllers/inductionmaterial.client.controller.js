'use strict';

angular.module('main').controller('InductionmaterialController', ['$scope', '$stateParams','$http', '$location','Authentication','QuickLinks', 'Employees',
	function($scope, $stateParams, $http, $location, Authentication, QuickLinks, Employees) {
		$scope.authentication = Authentication;
		$scope.current_user;
		$scope.item="";

		$scope.create = function() {
			var quicklink = new QuickLinks({
				title: this.title,
				content: this.content
			});
			quicklink.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(quicklink) {
			if (quicklink) {
				quicklink.$remove();

				for (var i in $scope.quicklinks) {
					if ($scope.quicklinks[i] === quicklink) {
						$scope.quicklinks.splice(i, 1);
					}
				}
			} else {
				$scope.quicklink.$remove(function() {
					$location.path('quicklink');
				});
			}
		};

		$scope.update = function() {
			var quicklink = $scope.quicklink;

			quicklink.$update(function() {
				$location.path('quicklinks/' + quicklink._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.increment = function(item){
			item.count += 1;
			$scope.item=item;
			console.log($scope.downloads);
			console.log($scope.quicklinks);
			var addlist={
					name: $scope.item.label,
					category: $scope.item.section_header,
					username: $scope.current_user,
					downloaded_at: new Date().toISOString()
			};

			$http.post('/downloads', addlist).success(function(response){
					$scope.item="";
			});
		}

		$scope.find = function() {
			$scope.quicklinks = QuickLinks.query();
		};

		$scope.findOne = function() {
			$scope.quicklink = QuickLinks.get({
				quicklinkId: $stateParams.quicklinkId
			});
		};
	}
]);
