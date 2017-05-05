'use strict';

angular.module('main')
.directive('modalForm', function (ngDialog) {
	return {
		restrict:'A',
		scope: {
			template: '=',
			onSubmitForm: '&',
			onDelete: '&',
			open: '=',
			info: '='
		},
		link: function (scope, element, attr) {
			scope.$watch('open', function (n,o) {
				if(n) {
					ngDialog.openConfirm({ 
	        			template: scope.template,
	        			scope: scope,
	        			preCloseCallback: function () {
	        				scope.open = false;
	        				
	        			}
	        		});
				}
			});

			scope.submitForm = function (valid) {
				scope.open = false;
				scope.onSubmitForm({ data: scope.info});
			}

			scope.delete = function () {
				scope.onDelete();
			}


		}
	}
});

