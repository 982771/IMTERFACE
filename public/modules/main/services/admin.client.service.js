'use strict';

angular.module('main').factory('Admin',
	function ($http) {

		var Admin = {

			//current_user: null,
			admin_list: [],
			list: function (callback) {
				if(_.isEmpty(Admin.admin_list)) {
					var promise = $http({
						method:'GET',
						url:'/admins'
					});
					promise.success( function (res) {						
						Admin.admin_list = res;
						callback(res);
					});
				}
				else {
					callback(Admin.admin_list);
				}
			},			
		}

		return Admin;		
	}
)
