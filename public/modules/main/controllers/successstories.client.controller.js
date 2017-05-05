'use strict';

angular.module('main').controller('SuccessstoriesController',['$scope', '$rootScope', '$q' ,'$http', '$stateParams', '$location','Authentication','SuccessStories','ngDialog', 'Employees', 'Admin',
	function($scope,$rootScope,$q,$http,$stateParams, $location,Authentication,SuccessStories,ngDialog,Employees,Admin) {
		$scope.authentication = Authentication;
		$scope.admin;
		$scope.hideEdit="true";


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

				var getSuccessQuotes = function(){

					var p=$q.defer();

					$http({
					method: 'GET',
					url: '/successstories'
					}).then(function successCallback(response) {
						    $scope.successStories=response.data;
						    p.resolve();
						}, function errorCallback(response) {
						    console.log("error");
							});

					return p.promise;
				}

				getCurrentUser()
				.then(getAdmins)
				.then(getSuccessQuotes);


			};

		    $scope.openSuccessForm = function() {

			      ngDialog.openConfirm({
			      	template: '/modules/main/views/success-stories-form.client.view.html',
			      	scope:$scope
               	  });

			    $scope.submitSuccessForm = function(isValid) {
        			if (isValid) {

	      				var addlist = new SuccessStories({
					        title: this.title,
					        by: this.by,
					        successdate: new Date(this.successdate).toISOString(),
					        content: this.content,
					        problem: this.problem,
					        approach: this.approach,
					        impact: this.impact,
			        		created_at: new Date().toISOString()
		        		});

				        var mailData = {
				        	"emailId" : $scope.current_user.notes_email_id,
				        	"title" : this.title,
					        "by" : this.by,
					        "successdate" : this.successdate,
					        "content" : this.content,
					        "problem" : this.problem,
					        "approach" : this.approach,
					        "impact" : this.impact
				        }

						$http.post('/successstories', addlist).success(function(response){
							$scope.title ="";
							$scope.by="";
						    $scope.successdate ="";
						    $scope.content ="";
						    $scope.problem ="";
						    $scope.approach ="";
						    $scope.impact ="";
							$scope.successStories.push(response);
							$scope.find();
							console.log(response);
						});

						$http({
							method: 'POST',
							url: '/mail-successstories',
							data: mailData
						}).then(function successCallback(response) {
						   console.log("success");
						}, function errorCallback(response) {
						    console.log("error");
						});


    		    };
    	    };
	    };



		$scope.init = function(){
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
			var num_elements = 9;
			$(".story_module").each(function(i){
				num_elements = i;
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

			$scope.fulltitle = function(storytitle){
		     	console.log(storytitle);
		     	$(".truncatetitle").tooltip({	title:storytitle,
		     									placement:"top"});
		     	// $(".tooltip.tooltip-inner").css("display","inline");
		     };

			$scope.showArticle = {};

			$scope.loadContent = function(story){

				var temp="false";
				$scope.showArticle = story;
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


			 $scope.SuccessStory = {};

			$scope.openEditForm = function () {
					console.log($scope.showArticle);

	              ngDialog.openConfirm({
	                  template: '/modules/main/views/success-stories-edit-form.client.view.html', scope:$scope,
	                  controller: ['$scope', function($scope) {
		                   var currentDate;
		                   let article = $scope.showArticle;
		                   $scope.SuccessStory = article;	//quote1;

		                   $scope.$watch('successdate', function(date){
		                   	console.log(date);
		                   	currentDate = new Date(date);
		                   });

							$scope.$watch('SuccessStory.successdate', function (newValue) {
									console.log("inside watch "+newValue);

							    $scope.successdate = newValue.toString().split("T")[0];

							});
							console.log(currentDate);


		                    $scope.updateQuoteForm = function() {

		                    	console.log($("#content").val());

		                       var id=$scope.showArticle._id;	//$scope.SuccessStory._id;

		                       var addlist = new SuccessStories({
							        title: $("#title").val(),	//$scope.SuccessStory.title,
							        by: $("#by").val(),	//$scope.SuccessStory.by,
							        successdate: currentDate,
							        content: $("#content").val(),	//$scope.SuccessStory.content,
							        problem: $("#problem").val(),	//$scope.SuccessStory.problem,
							        approach: $("#approach").val(),	//$scope.SuccessStory.approach,
							        impact: $("#impact").val()	//$scope.SuccessStory.impact
					       		 	});

		                        console.log(addlist);

		                        $http.put('/successstories/' +id, addlist).success(function(response){

		                        	$scope.closeThisDialog();

		                          	$scope.SuccessStory.by = response.by;
		                          	$scope.SuccessStory.title = response.title;
		                          	$scope.SuccessStory.successdate = response.successdate;
		                          	$scope.SuccessStory.content = response.content;
		                          	$scope.SuccessStory.problem = response.problem;
		                          	$scope.SuccessStory.approach = response.approach;
		                          	$scope.SuccessStory.impact = response.impact;

		                        });
		                    }

		               }],

		               preCloseCallback:function(){
        	                //To Refresh Data

	            		}
             	  });
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
