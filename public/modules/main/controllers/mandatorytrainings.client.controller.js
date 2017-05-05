'use strict';

angular.module('main').controller('MandatoryTrainingsController',['$scope', '$http', '$stateParams', '$location','Authentication','ngDialog','Admin','Employees',
	function($scope,$http,$stateParams, $location, Authentication , ngDialog, Admin, Employees) {
		$scope.authentication = Authentication; 
		$scope.admin;
		$scope.hideEdit="true";
		$scope.current_user;
		
		

			  /* find() reads data from database */
			$scope.find = function() {
				console.log("inside find");
				
				Employees.getCurrentUser( function (res) {
			        Admin.list( function (res1) {
			        	console.log(res1.length);
			            $scope.admin=res1;
			            console.log($scope.admin);
			            $scope.current_user = res;		            

			            for(var i=0;i<$scope.admin.length;i++)
		          
		    { 
		        if($scope.admin[i].fmno==$scope.current_user.fmno)
		          { 
		              
		            $scope.hideEdit="false";		              
		                            
		          }
		    }

			        })
			        	
			     })

			}; //End of find function

			$scope.find();

			console.log($scope.admin);
			
				        			
		


		    $scope.openTrainingsForm = function() {
		    	  console.log("inside form")
			      ngDialog.openConfirm({ 
			      template: '/modules/main/views/mandatory-trainings-form.client.view.html',
			      scope:$scope

               });
			       $scope.priority = {
					    options: [
					      'high',
					      'medium',
					      'low'
					    ],
					    selected: 'high'
					  };

			    $scope.submitTrainingsForm = function(isValid) {
        			if (isValid) {

	      				/*var addlist = new MandatoryTrainings({
					        name: this.name,
					        link: this.link,
					        priority: this.priority
			        });*/
					console.log("submit form")
					console.log($scope.priority.selected)
					var addlist={
							name: this.name,
					        link: this.link,
					        priority: $scope.priority.selected,
					        created_at: new Date().toISOString()

					}; 

				$http.post('/mandatorytrainings', addlist).success(function(response){
					$scope.name ="";
					$scope.link="";
				    $scope.priority ="";				
					$scope.mandatoryTrainings.push(response);
				        });

    		    };		    		
    	    };
	    };

			
		//$scope.mandatoryTrainings = MandatoryTrainings.query();		
		
			
		$http({
			method: 'GET',
			url: '/mandatorytrainings'
			}).then(function successCallback(response) {				   
				    $scope.mandatoryTrainings=response.data;	    				    	         
				}, function errorCallback(response) {				   
				    console.log("error");
				});	

	

	
		
		
	} //End of scope function

]);