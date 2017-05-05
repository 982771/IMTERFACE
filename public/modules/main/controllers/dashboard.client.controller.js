'use strict';

angular.module('main').controller('DashboardController', ['$scope','$http', '$q', '$timeout','Employees', 'Admin',
	function ($scope, $http, $q, $timeout, Employees, Admin) {
		$scope.pollData=[];
		$scope.poll;
		$scope.currentUser;
		$scope.pollStatus;
		$scope.sum;
		$scope.pollPercentage = [];
		$scope.pollSelected;
		$scope.showMessage = false;
		$scope.eventData=[];
		$scope.eventIcon=[];
		$scope.rssfeeds = [];
		$scope.admin;

		$scope.current_user;

		$scope.message="";

		$scope.find = function() {
			console.log("Inside find");
			var getEmployee=function()
			{
				var p=$q.defer();
				Employees.getCurrentUser( function (res) {

					Admin.list( function (res1) {
			            $scope.admin=res1;
			    	});

				$scope.current_user = res;

	            p.resolve();

			    });

			 return p.promise;
	    }

			var getAdmins = function(){
				var p=$q.defer();
				Admin.list( function(res){
					$scope.admin=res;

						var temp="false";
						console.log("Inside admin");

						console.log($scope.admin.length);

						for(var i=0;i<$scope.admin.length;i++)
							{
								console.log($scope.current_user.fmno);
								$scope.hideEdit="true";
								if($scope.admin[i].fmno==$scope.current_user.fmno)
								{
									temp="true";
									$scope.hideEdit="false";
									console.log($scope.hideEdit);
								}
							}

					p.resolve();
				});

				return p.promise;
			};

			getEmployee()
			.then(getAdmins);


		}; //find function



		$scope.find();




		$("#twitter-widget-holder").mCustomScrollbar({
        theme:"minimal",
        scrollInertia: 60,
        mouseWheel:{ enable:true }
      });

		// $timeout = twttr.widgets.load();



		var get_current_user = function () {
			Employees.getCurrentUser( function (res) {
				$scope.currentUser=Employees.current_user;
				$scope.checkPollStatus();
			});
		}

		$http({
  				method: 'GET',
 				url: '/events'
			}).then(function successCallback(response) {
				    $scope.eventData=response.data;
				    $scope.getEventIcon();
				}, function errorCallback(response) {
				    console.log("error");
				});

		$http({
  				method: 'GET',
 				url: '/poll'
			}).then(function successCallback(response) {
					$scope.pollData=response.data;
				    $scope.poll = _.first(_.where($scope.pollData, {isActive: true}));
				    get_current_user();
				}, function errorCallback(response) {
				    console.log("error");
				});



		$http({
				method: 'JSONP',
				url: 'http://home.intranet.mckinsey.com/ksapi/feed/mck_insights?callback=JSON_CALLBACK'
		}).then(function successCallback(response) {
			    $scope.rssfeeds =response.data.items;
			}, function errorCallback(response) {
			    console.log("error");
			});



		$scope.getEventIcon = function(){
			$scope.eventIcon = _.map($scope.eventData, function(event){
				var iconClass;
				switch (event.type) {
				    case "Birthday":
				        iconClass = "glyphicon-gift";
				        break;
				    case "Certification":
				        iconClass = "glyphicon-list-alt";
				        break;
				    case "Event":
				        iconClass = "glyphicon-flag";
				        break;
				    case "Other":
				        iconClass = "glyphicon-star";
				        break;
				}
				return iconClass;
			});
		}




		/*
		 This function performs the following tasks:
		 1) Checks if logged in user has already voted or not for the active poll
		 2) Calculates the total votes for the active poll
		 3) Calculates percentage of votes for individual options in the active poll

		*/

		$scope.checkPollStatus = function(){
			$scope.pollStatus = _.contains($scope.poll.empIds, parseInt($scope.currentUser.fmno));
			$scope.sum = 0;
	    	_.each(_.pluck($scope.poll.choices, 'count'), function(num){
	    		$scope.sum = $scope.sum + parseInt(num, 10);
	    	});
			$scope.pollPercentage = _.map(_.pluck($scope.poll.choices, 'count'), function(num){
				return (num*100/$scope.sum);
			});
		}


		$scope.savePollResult = function(pollSelected){
			if(typeof pollSelected == 'undefined')
				return;
			_.each($scope.poll.choices, function(choice){
				if(choice.option_text == pollSelected)
					choice.count++;
			});
			$scope.poll.empIds.push(parseInt($scope.currentUser.fmno));

			$http({
				method: 'PUT',
				url: '/poll',
				data: $scope.poll
				}).then(function successCallback(response) {
				     $scope.checkPollStatus();
				}, function errorCallback(response) {
				    console.log("error");
				});
		}

		var showFeedback = function () {
			$scope.showMessage = true;
			$timeout( function () {
				$scope.showMessage = false;
			}, 5000);
		}

		$(".tooltip.tooltip-inner").css("display","inline");

		$scope.sendFeedback = function(message){
			var feedback = {
				"text": message,
				"emailId" : $scope.currentUser.notes_email_id
			} //TODO: Change emailId



			$http({
				method: 'POST',
				url: '/mail',
				data: feedback
				}).then(function successCallback(response) {
				   showFeedback();
				}, function errorCallback(response) {
				    console.log("error");
				});


		}
	}
]);
