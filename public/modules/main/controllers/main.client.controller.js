  'use strict';

  angular.module('main').controller('MainController', ['$scope','$rootScope', '$state', 'Employees',
  	function ($scope,$rootScope, $state, Employees) {  

    $('.dash-panel-30').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      // element is now visible in the viewport
      if (visiblePartY == 'top') {
        // top part of element is visible
      } else if (visiblePartY == 'bottom') {
        // bottom part of element is visible
      } else {
        // whole part of element is visible
        alert("visible");
      }
    } else {
      // element has gone out of viewport http://172.28.228.13:3000/#!/odcmap (http://172.28.228.13:3000/#%21/odcmap)  
    }
  });

  		$scope.menu = [ 			
                {"classnames":"hex-1","name":"ODC History","link":"#!/history","glyph":"glyphicon-fast-backward","iscontent":"true"},
                {"classnames":"",'iscontent':"false"},
                {"classnames":'hex-gap hex-2',"name":"Induction Material","link":"#!/inductionmaterial","glyph":"glyphicon-inbox","iscontent":"true"},
                {"classnames":"hex-3","name":"Success Stories","link":"#!/successstories","glyph":"glyphicon-thumbs-up","iscontent":"true"},
                {"classnames":"hex-4","name":"Customer Quotes","link":"#!/customerQuotes","glyph":"glyphicon-comment","iscontent":"true"},
                {"classnames":"hex-gap hex-5","name":"Floor Map","link":"#!/odcmap","glyph":"glyphicon-th","iscontent":"true"},
                {"classnames":"hex-1","name":"Gallery","link":"#!/gallery","glyph":"glyphicon-th","iscontent":"true"},         
                {"classnames":"","iscontent":"false"},
                {"classnames":"hex-gap hex-6","name":"PoCs","link":"#!/pocs","glyph":"glyphicon-comment","iscontent":"true"},
                {"classnames":"hex-8","name":"Global Footprint","link":"#!/wip","glyph":"glyphicon-map-marker","iscontent":"true"},
                {"classnames":" hex-1","name":"Mandatory Trainings","link":"#!/mandatoryTrainings","glyph":"glyphicon-book","iscontent":"true"},
                {"classnames":"hex-gap hex-2","name":"Contributors","link":"#!/contributors","glyph":"glyphicon-user","iscontent":"true"},
     	];

     $('.hex').hide();
    var uniqueRandoms = [];
          

  $scope.makeUniqueRandom= function() {
      // refill the array if needed
      var numRandoms = $(".hex").length;
      if (!uniqueRandoms.length) {
          for (var i = 0; i < numRandoms; i++) {
              uniqueRandoms.push(i);
          }
      }
      var index = Math.floor(Math.random() * uniqueRandoms.length);
      var val = uniqueRandoms[index];

      // now remove that value from the array
      uniqueRandoms.splice(index, 1);

      return val;

  };

  $scope.pop = function() {          
  			
  			$(".hex").each(function(i){
  			var rand = $scope.makeUniqueRandom();
  			var hex = $(this);
  			setTimeout(function(){

  			hex.addClass("animated bounceIn");
  			hex.fadeTo(1,50);
  			},30*rand);

  			});
  			


          	
          };
          Employees.getCurrentUser( function (res) {
              $scope.current_user = res.ads_login_name;
              var log = {username: res.ads_login_name, fmno: res.fmno, created_at: new Date()};
              Employees.saveLog(log);
          });
          

  			$scope.load = function(){

    			$('.hex').css('opacity', 0);
    			$scope.pop();
  			};
  	}
  ]);