'use strict';


angular.module('main').factory('Colors',
	function() {
		var tech_colors = {};
		// var colors = ["#EB6B72","#F0A86A","#E3D25F","#8BE46C","#6CE4AC","#29D6A9","#48C78F","#5FBDDD","#DF6F78","#E3A570","#D8CB67","#89D279","#BAE46C","#5CE692","#EFC22E","#D3737E","#D7A377","#CDC46F","#87C086","#6CDDE4","#E378B0","#37D7A9","#C87884","#CBA17E","#C2BD77","#7AC9A5","#CE9AD6","#F08051","#30ACD5","#BC7C8A","#BF9E85","#B7B67F","#86B78D","#BA9AD6","#C5C64C","#B787C4","#B08190","#B29C8C","#ADAF87","#84A59A","#7D82D9","#8184EA","#F97B87","#A58596","#A69A93","#A2A88F","#74D682","#64ACE8","#E49477","#EE81A8"];
		var colors = ["#C91F37","#03A678","#89C4F4","#FAA945","#9B59B6","#DB5A6B","#763568","#22A7F0","#7A942E","#F3C13A","#4B77BE","#C93756","#F47983","#87D37C","#8D608C","#CA6924","#E68364","#4ECDC4","#BF55EC","#36D7B7","#F5D76E"];
		var current_color = 0;
		var Colors = {
			legend: [],
			getColor: function (group_by) {
				// console.log(group_by);
				var color = (_.find(Colors.legend, function (c) { return c.key == group_by;}) || {}).color;
				if(!_.isUndefined(color)) {
					return color;
				}
				else {
					color = colors[current_color];
					Colors.legend.push({key: group_by, color: colors[current_color]});
					current_color = current_color+1;
					return color;
				}
			},
			reloadColors: function () {
				Colors.legend = [];
				current_color = 0;
			}
		}

		return Colors;
	}
);