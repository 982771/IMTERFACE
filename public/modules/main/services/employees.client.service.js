'use strict';

angular.module('main').factory('Employees',
	function ($http) {

		var Employees = {
			current_user: null,
			employee_list: [],
			list: function (callback) {
				if(_.isEmpty(Employees.employee_list)) {
					var promise = $http({
						method:'GET',
						url:'/employees'
					});
					promise.success( function (res) {
						Employees.employee_list = res;
						callback(res);
					});
				}
				else {
					callback(Employees.employee_list);
				}
			},
			update: function (employee) {
				var promise = $http({
					method: 'PUT',
					url:'/employees',
					data: employee
				});
				return promise;
			},
			getCurrentUser: function ( callback ) {
				if(_.isNull(Employees.current_user)) {
					var promise = $http({
						method: 'JSONP',
						url: 'http://home.intranet.mckinsey.com/ksapi/person/current_user?callback=JSON_CALLBACK'
					});
					return promise.success( function (res) {
						Employees.current_user = res;
						var emp = {};
						emp.Name = res.ads_login_name;
						emp.Email = res.notes_email_id;
						emp.FMNO = res.fmno;
						emp.Location = res.office_label;
						callback && callback(res);
						// Employees.upsert(emp, function () {
						// 	callback && callback(res);
						// })
						
					});
				}
				else {
					callback && callback(Employees.current_user);
				}
			},
			findEmployeeByDesk: function (desk) {
				var emp = _.find(Employees.employee_list, function (e) { return e.Desk == desk;}) || {};
				return emp["_id"];
			},
			save: function (data, callback) {
				console.log(data);
				Employees.employee_list = [];
				var method = data["_id"] ? "PUT" : "POST";
				//var method = 'PUT';
				var promise = $http({
					method: method,
					url:'/employees',
					data: data
				});
				promise.success( function (res) {
					callback && callback(res);
				});
			},
			saveLog: function (log, callback) {
				var promise = $http({
					method: 'POST',
					url:'/logs',
					data: log
				});
				return promise.success( function (res) {
					callback && callback();
				})
			},
			delete: function (data , callback) {
				Employees.employee_list = [];
				var promise = $http({
					method: 'DELETE',
					url: '/employees/'+data["_id"]
				});
				promise.success( function (res) {
					callback && callback(res);
				});

				// });
			}
		}

		return Employees;		
	}
)
