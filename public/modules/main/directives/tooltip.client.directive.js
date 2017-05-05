'use strict';

angular.module('main')
.directive('tooltip', function () {
	return {
		restrict:'E',
		scope: {
			base: '=',
			content: '='
		},
		templateUrl: 'modules/main/views/tooltip.client.view.html',
		link: function (scope, element, attr) {
			scope.showTooltip = function (event) {
				if(scope.content && scope.content.length) {
					var left = event.clientX + 20;
					var top = event.clientY - 30;
					scope.style = {left: left, top: top };
					scope.show = true;
				}
			}


		}
	}
});

