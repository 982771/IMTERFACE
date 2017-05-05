'use strict';

angular.module('main').factory('Layout', 
	function ($http, Employees, Colors) {

		
		var Layout = {
			get: function (callback) {
				return $http.get('/modules/main/json/floor_map_layout.json')
				.success( function (res) {
					// return $http.get('/modules/main/json/employee_data_angeline.json')
					// .success( function (emp_data) { 
					Employees.list(function (emp_data){   
					  Employees.employee_list = emp_data;
			          var data = Layout.formatData(res, emp_data);
					  callback(data);
	
					})
					
				})
			},
			setColorMap: function (map, group_by) {
				if(map.info[group_by]) {
					map.color = Colors.getColor(map.info[group_by]);
				}
			},
			formatData: function(map_data, emp_data) {
				var format_data = [];
				angular.forEach(map_data, function (d) {
					
					angular.forEach(d.col_data, function (map) {
						//console.log(desk);
						
							
						map.row_id = d.row_id;
						angular.forEach(emp_data, function (e) {
			          		var desk = e.Desk;
			          		var deskno = (map.type == "desk" )? desk.slice(3,6) : desk.toUpperCase();
			          		if(deskno == map.map) {
			          			map.info = {};
			          			_.extend(map.info, e);
			          			if(map.type == "desk") {
			          				Layout.setColorMap(map, "Tech Group");
			          			}
			          			map.info.Project = (e["Primary Project"]  == "") ? e["Secondary Project"] : e["Primary Project"];
			          		}

						});
						if(map.type =="desk" && _.isUndefined(map.info)) {
							map.info = {};
							map.info.Desk = "9C-"+map.map;
						}
					});
					format_data.push(d.col_data);
					//console.log(format_data)

				});
				return format_data;
			}
		}

		

		function getTechnology(e) {
			var technology = "";
			var prim = e['Primary Skill/Technology'].length;
			var sec = e['Secondary Skill/Technology'].length;
			var other = e['Other Skill'].length;
			if(prim) {
				technology = e['Primary Skill/Technology'];
			}
			
			if(sec) {
				if(prim) {
					technology = technology + ", ";
				}
				technology = technology + e['Secondary Skill/Technology'];
			}


			if(other) {
				if(prim || sec) {
					technology = technology + ", ";
				}
				technology = technology + e['Other Skill'];
			}
			return technology;
		}

		return Layout;		
	}
)
