'use strict';

angular.module('main')
.directive('mapitem', function (Colors,$timeout) {
	return {
		restrict:'A',
		scope: {
			info: '=',
			colSpan: '=',
			rowSpan: '=',
			includeHorizontalPath: '=',
			includeVerticalPath: '=',
			type: '=',
			name: '=',
			onHoverItem: '&',
			search: '=',
			refresh: '=',
			color: '=',
			opacity:'='
			// openForm: '&'
		},
		transclude: true,
		templateUrl: 'modules/main/views/cubicle.client.view.html',
		link: function (scope, element, attr) {
			var hor_x,hor_y,ver_x,ver_y;
			//console.log(element.getBoundingClientRect());
			var parent_element = angular.element(document.querySelector('.odcmap'))[0];
			var desk_width = 50;
			var desk_height = 50;
			var tech_colors = [];
			var current_color = 0;
			scope.toggle = false;
			var watch1 = scope.$watch('refresh', function (n,o) {
				if(n) {
					//console.log(n + " " + o);
					// if(n.property == 'dimension') {
						scope.totalWidth = parent_element.offsetWidth - 34;
						 hor_x = parent_element.offsetLeft;
						 hor_y = parent_element.offsetWidth + parent_element.offsetLeft;
						 ver_x = parent_element.offsetTop;
						 ver_y = parent_element.offsetHeight + parent_element.offsetTop;
						scope.totalWidth = parent_element.offsetWidth - 34;
						var totalDesk = 19;
						scope.colSpan = (scope.colSpan == "") ? 0 : scope.colSpan;
						var col_span = (scope.colSpan == "max") ? totalDesk : scope.colSpan;
						
						// desk_width = (col_span/totalDesk) * scope.totalWidth;
						desk_width = (col_span/totalDesk) * scope.totalWidth;
						var vertical_path = parseFloat(scope.includeVerticalPath) ? scope.includeVerticalPath : 0;
						desk_width =  Math.round(desk_width + 17 * (vertical_path));
						
						if(scope.type != 'path') {
							desk_height = 40;
							$(element).height(desk_height*1);
							$(element).css({'width':desk_width});
							$(element).css({'max-width':desk_width});
							scope.font = desk_width + '%';
						}
					// }
				
					// if(scope.info && scope.info["Tech Group"]) {
					// 	//$(element.css('background-color',Colors.getColor(scope.info.project)));
					// 	scope.bg_color = Colors.getColor(scope.info["Tech Group"]);
					// }
				
					
					//scope.refresh = false;
				}

			});

			scope.open = function () {
				scope.openForm({info: scope.info});
			}

			scope.showTooltip = function (event) {
				// $timeout( function () {
					var width = parent_element.offsetWidth;
					var height = parent_element.offsetHeight;
					
					if(scope.info && scope.info.Name && scope.info.Name.length) {
						var tool_tip = angular.element(document.querySelector('.tool-tip'))[0];
						var tool_tip_width = tool_tip.offsetWidth == 0 ? 200 : tool_tip.offsetWidth
						var tool_tipX = event.clientX + tool_tip_width;
						var tool_tipY = event.clientY + 92;
						var left, top;
						if(tool_tipX > hor_y) {
							left = event.clientX - tool_tip_width - 10;
						}
						else {
							left = event.clientX + 10;
						}
						if(tool_tipY > ver_y) {
							top = event.clientY - (tool_tip.offsetHeight == 0 ? 92 : tool_tip.offsetHeight) - 10;
						}
						else {
							top = event.clientY + 10;
						}
						scope.onHoverItem({event:event,info:scope.info,toggle:true,left: left, top: top });
					}
				// }, 500);
			}

			scope.requestInfo = function(){
				scope.getInfo({info:scope.info});
			}
			scope.hideTooltip = function () {
				// $timeout(function() {

					if(scope.info && scope.info.Name && scope.info.Name.length) {
						scope.onHoverItem({toggle:false});
					}

				// }, 1000);
					
				
			}


			var watch2 = scope.$watch('search', function (n,o) {
				
				if(scope.colSpan) {
					if(n) {
					  var active;
				      n = n.toLowerCase();
				      angular.forEach(scope.info, function (d) {
				      	if(d && d.toLowerCase().match(n)) {
				      		//console.log(d);
				      		// console.log(d);
				      		active = true;
				      		scope.active = 'active';
				      		//return 'active';
				      	}
				      });
				      if(!active) {
				      	scope.active = 'dim';
				      }
				  	  
				  	}
				  	else {
				  		scope.active = 'active';
				  	}
				}
			})

			var pos_left = angular.element(angular.element(element[0]).prop('offsetParent')).prop('offsetLeft');
			var pos_top = angular.element(angular.element(element[0]).prop('offsetParent')).prop('offsetTop');

			scope.$on('$destroy', function (n,o) {
				watch1();
				watch2();
			});
			


		}
	}
})
.directive("odcmap", function (Layout,$window, Employees, Colors) {
	return {
		restrict: 'A',
		scope: {
			search: '=',
			showLegend: '='
		},
		templateUrl: "/modules/main/views/map.client.view.html",
		link: function ( scope, element, attr) {
			scope.templateUrl = "/modules/main/views/employee-form.client.view.html";
				scope.refresh = false;
				scope.group_by = "Technology Group";
				Layout.get( function (res) {
					scope.map_data = res;
					// scope.refresh = true;
					scope.legend = Colors.legend;
					scope.window_width = $window.innerWidth;
					scope.window_height = $window.innerHeight;
					angular.element($window).bind('resize', function(){
		       
			         scope.window_width = $window.innerWidth;
			         scope.window_height = $window.innerHeight;
			         // manuall $digest required as resize event
			         // is outside of angular
			         scope.$digest();
			       });
				})
				scope.showToolTip = false;
				scope.data = {};
				var row_id;
				var elm_width;
				var legend_elm = angular.element(document.querySelector('.legend-container'))[0];
				
				scope.$watch('showLegend', function (n,o) {
					if(scope.showLegend) {
						scope.opacity = 0.5;
						$(legend_elm).addClass('enter-right');
					}
					else {
						scope.opacity = 1;
						$(legend_elm).removeClass('enter-right');
					}
				})
				var watch1 = scope.$watch('window_width', function (n,o) {
					if(!_.isUndefined(n)) {
						$(element).css('width','100%');
						elm_width = $(element).width();
						scope.refresh =  n;
						// var width = $(element).width();
						// $(element).css({'max-width': width});		
					}
				});

				scope.toggleTooltip = function (event, info, toggle, left, top) {
					if(!toggle) {
						scope.showToolTip = false;
					}
					
					else {
	                     	scope.tooltipLeft = left;
	                     	scope.tooltipTop = top;
			
			       			scope.data = angular.copy(info);      //info in the tooltip
			        	// console.log(scope.data)
			        		scope.showToolTip = true;
					}
				}
				scope.close = function () {
					scope.open_form = false;
				}
				var current_desk;
				scope.openForm = function (index, row) {
					if(row[index].type === "desk" || (row[index].type == "meeting" && row[index].info && row[index].info.name != "")) {

						scope.open_form = true;
						scope.modal_data = row[index].info;
						current_desk = scope.modal_data.Desk;

							
					}
				

				}
				var reload = function (res) {
					console.log('reload');
					Colors.reloadColors();
					Layout.get( function (map_data) {
						scope.map_data = {};
						scope.map_data = map_data;
						scope.refresh = res;
						scope.legend = Colors.legend;
					});
				};
				scope.onSave = function (data) {
					$(element).css('width',elm_width);
					Employees.save(data, function (res) {
						reload(res);
					});
				};

				scope.onDelete = function () {
					Employees.delete(scope.modal_data, function (res) {
						scope.open_form = false;
						reload(res);
					})
				}

				scope.$on('$destroy', function () {
					watch1();
				})
		
		}
	}
});
