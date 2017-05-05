
'use strict';

angular.module('main').controller('PocController',['$scope', '$http', '$rootScope', '$q', 'ngDialog', '$stateParams', '$location','Authentication','pocs', 'Employees', 'Admin',
	function($scope, $http, $rootScope, $q, ngDialog, $stateParams, $location, Authentication, pocs, Employees, Admin) {
		$scope.authentication = Authentication;
			$scope.htmlVariable = "";
			/* find() reads data from database */
			
			$scope.find = function() {

				var getCurrentUser = function (){

					var p=$q.defer();

					Employees.getCurrentUser( function (res) { 
			            $scope.current_user = res;
			            $scope.by = $scope.current_user.ads_login_name;
			            p.resolve();       
					});

				 return p.promise;	
				}

				var getAdmins = function(){

					var p=$q.defer();

					Admin.list( function(res){
						$scope.admin=res;
						p.resolve();
					});

				 return p.promise;
				}

				var getPocQuotes = function(){

					var p=$q.defer();

					$http({
					method: 'GET',
					url: '/pocs'
					}).then(function successCallback(response) {				   
						    $scope.pocs=response.data;
						    p.resolve();   				    	         
						}, function errorCallback(response) {				   
						    console.log("error");
							});

					return p.promise;
				}

				getCurrentUser()
				.then(getAdmins)
				.then(getPocQuotes);		
			
			};

			$scope.init = function()
			{				
				$(".story_div").hide();
				$(".storyContent").hide();
				$(".pagination-section").hide();
				$(".storyContent").removeClass("animated fadeIn");
				$(".close-button").hide();
				$(".theFullStory").hide();				
			};
		
			$scope.init();
		
			$scope.load = function(){

				var num_elements=9;
				$(".story_div").show();
				
				$(".story_module").hide();
			
				$(".story_module").each(function(i){
					var story = $(this);
					setTimeout(function() {
				    story.addClass('animated slideInUp');
					story.show();
				  }, 180*i);
					});
				setTimeout(function() {
				    $(".pagination-section").addClass('animated slideInUp');				
					$(".pagination-section").show();
				  }, 180*num_elements);

				setTimeout(function() {
					$(".story_module").each(function(i){
					var story = $(this);
					story.removeClass('animated')
					
					 });
				   
				   },180*num_elements+1000);

				};

		
			$scope.showArticle = {};
			
			$scope.loadContent = function(story){
				console.log(story);
				var temp="false";
				$scope.showArticle = story;	

				//To Avoid Auto-Updating Rich-Text Content Section
				$("#contentBlock").html($scope.showArticle.content);
				$("#content").html($scope.showArticle.content);

				$scope.hideEdit="true";			

				for(var i=0;i<$scope.admin.length;i++)
		          
		          { 
		             if($scope.admin[i].fmno==$scope.current_user.fmno)
		             { 
		              
		              temp="true";		              
		                            
		             }
		          }		         

		        if($scope.showArticle.by==$scope.current_user.ads_login_name || temp=="true")			         
			         {

			         $scope.hideEdit="false";

			         }

				$scope.showContent();				
		
				};

			$scope.openEditForm = function (quote1) {

					console.log($scope.showArticle);	
	              ngDialog.openConfirm({ 
	                  template: '/modules/main/views/pocs-edit-form-client.view.html', scope:$scope,
	                  controller: ['$scope', function($scope) {               	
		                   var currentDate;
		                   $scope.poc1 = quote1;
                        	
                    	   $("#contentBlock").html($scope.showArticle.content);		                        	
                    	   $("#content").html($scope.showArticle.content);		                        	


		                   $scope.$watch('successdate', function(date){
		                   	console.log(date);
		                   	currentDate = new Date(date);
		                   });

							$scope.$watch('poc1.successdate', function (newValue) {
									console.log("inside watch "+newValue);

							    $scope.successdate = newValue.toString().split("T")[0];

							}); 
							console.log(currentDate);           

		                    $scope.updateQuoteForm = function() { 

		                       var id=$scope.poc1._id;

		                       var addlist = new pocs({	
							        title: $("#title").val(),	//$scope.poc1.title,
							        by: $("#by").val(),	//$scope.poc1.by,
							        successdate: currentDate,
							        content: $scope.poc1.content,	//$("#content").val(),	//$scope.poc1.content,
							        desc: $("#abstract").val()	//$scope.poc1.desc,							        
				       		 	});

		                        console.log(addlist);

		                        $http.put('/pocs/' +id, addlist).success(function(response){ 	                          
		                     
		                        	$scope.closeThisDialog();			                        

		                        	$scope.poc1.by = response.by;		                        	
		                        	$scope.poc1.title = response.title;		                        	
		                        	$scope.poc1.successdate = response.successdate;		                        	
		                        	$scope.poc1.content = response.content;		                        	
		                        	$scope.poc1.desc = response.desc;

		                        	$("#contentBlock").html(response.content);		                        	

		                        });
		                    }                  
		               }],

	               		preCloseCallback:function(){
        	                //To Refresh Data        	                                		
                        	//$("#contentBlock").html($scope.showArticle.content);
                        	$scope.showArticle.content = $("#contentBlock").html();		                        	
	 					
            		   	}
             	  });				
             };		

		    $scope.openSuccessForm = function() {
			      
			      ngDialog.openConfirm({ 
			      	template: '/modules/main/views/pocs-form.client.view.html',
			      	scope:$scope
               	  });

			    $scope.submitPocForm = function(isValid) {
			    	console.log("Hai");
        			if (isValid) {


	      				var addlist = new pocs({
					        title: this.title,
					        by: this.by,
					        successdate: new Date(this.successdate).toISOString(),
					        content: this.content,
					        desc: this.desc,					        
			        		created_at: new Date().toISOString()
		        		});
	      				console.log(addlist);
	      				
				        var mailData = {
				        	"emailId" : $scope.current_user.notes_email_id,
				        	"title" : this.title,
					        "by" : this.by,
					        "successdate" : this.successdate,
					        "content" : this.content,
					        "abstract" : this.desc
				        }

						$http.post('/pocs', addlist).success(function(response){
							$scope.title ="";
							$scope.by="";
						    $scope.successdate ="";
						    $scope.content ="";
						    $scope.desc ="";
						     console.log(response);	
							$scope.pocs.push(response);
						});

						$http({
							method: 'POST',
							url: '/mail-pocs',
							data: mailData
						}).then(function successCallback(response) {	
						   console.log("success");
						}, function errorCallback(response) {				   
						    console.log("error");
						});	


    		    };		    		
    	    };
	    };
			$scope.showContent = function(){
			
			
				$(".story_module").removeClass("slideInUp");
				$(".pagination-section").removeClass("slideInUp");
				$(".close-button").hide();

				$(".story_module").each(function(i){

					var story = $(this);
					setTimeout(function() {
						$(".pagination-section").addClass("bounceOutDown");
						story.addClass('bounceOutDown');
						story.show();
				  }, 10*($(".visibleStory").length-i));
				  
				    setTimeout(function(){
					  $(".story_module").hide();
					  $(".pagination-section").hide();
					  $(".story-link").hide();
					  $(".storyContent").removeClass("fadeIn fadeOut");
					  $(".storyContent").show();
					  $(".storyContent").addClass("animated fadeIn");
					  $(".close-button").show();
					  $(".theFullStory").show();
				  },(50*($(".visibleStory").length)+30));
				
				});

			};

			setTimeout(function(){$scope.load();},200);

			$scope.closeStory= function(){
	     	   
		       $(".storyContent").removeClass("fadeIn").addClass("fadeOut");
		       $(".story_module").removeClass("bounceOutDown");
		       var num_elements=9;

		       setTimeout(function(){
			        $(".close-button").hide();
			        $(".theFullStory").hide();
			       	$(".story_module").each(function(i){
				  	var story = $(this);
					setTimeout(function() {
					    story.addClass('animated slideInUp');
					     $(".story-link").show();
						story.show();
					  }, 180*i);
			
					});
			    },200);

		       setTimeout(function() {
				    $(".pagination-section").addClass('animated slideInUp');				
					$(".pagination-section").show();
				  }, 180*num_elements);

				setTimeout(function() {
					$(".story_module").each(function(i){
					var story = $(this);
					story.removeClass('animated')
					
					 });
				   
				   },180*num_elements+2000);
	     };
	} //End of scope function

]);