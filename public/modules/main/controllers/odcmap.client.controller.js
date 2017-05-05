'use strict';

angular.module('main').controller('ODCMapController', ['$scope', '$timeout', '$rootScope','Layout', 'Employees',
	function ($scope, $timeout, $rootScope, Layout, Employees) {		
	}
])
.filter('highlight', function($sce) {
    return function(data, search_val) {
    var active;
    if(search_val) {
      search_val = search_val.toLowerCase();
      angular.forEach(data, function (d) {
      	if(d.toLowerCase().includes(search_val)) {
      		console.log(d);
      		active = true;
      		return 'active';
      	}
      })
      if(!active) {
      	return 'dim';
      }  	  
  	}
  }
});
