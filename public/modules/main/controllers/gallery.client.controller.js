'use strict';

angular.module('main')
	.controller('GalleryController', ['$http', '$scope',
		function($http, $scope) {
			// Controller Logic

			$scope.find = function(){
				$http.get('/gallery').success(function(response){
					 $scope.albums = response;
					 $scope.slides_images = response[0];
				});
			}

			$scope.showAlbums = function(album){
				console.log(album);
				$scope.slides_images = album;

				$(".albumTitle").hide();
				$(".borderAlbum").show();
			}

		}
	]);
