'use strict';

angular.module('main').controller('CustomerquotesController',['$scope', '$http', '$q', '$rootScope', '$stateParams', '$location','Authentication','CustomerQuotes', 'ngDialog', 'Employees','Socket', 'Admin',
	function ($scope, $http, $q, $rootScope, $stateParams, $location,Authentication,CustomerQuotes, ngDialog, Employees, Socket, Admin) {

 		$scope.authentication = Authentication;
		$scope.customerQuotes = {};
		$scope.current_user;
		$scope.all_employees;
  		$scope.customerQuote;
  		$scope.by;
  		$scope.admin;
		//$scope.hideDelete="true";
		console.log($scope.current_user);


  		Socket.on('quoteUpdationCompleted',function(data){
  			console.log("socket2");
  			$scope.find();
  		});



	/*$scope.openQuotePopup = function (quote, show) {
		$scope.showComments = show;
		$scope.customerQuote = quote;
		//$scope.customerQuote.date=$scope.customerQuote.date.split("T")[0];
        ngDialog.open({ template: 'quotePopupTemplate', scope:$scope});
    }; */

    $scope.openQuotePopup = function (quote, show) {

        var adminEdit="true";
        var adminDelete="true";
        var temp="false";
        $scope.showComments = show;
        $scope.customerQuote=quote;
        $scope.hideDelete="true";

        $scope.deleteAdmin = function()
        	{

		        for(var i=0;i<$scope.admin.length;i++)
		          {

		             if($scope.admin[i].fmno==$scope.current_user.fmno)
		             {

		              temp="true";

		             }
		          }

		        if(quote.by==$scope.current_user.ads_login_name || temp=="true")
		         {

		          adminEdit="false";
		          //$scope.edit="false";
		         }

		         for (var j=0;j<$scope.customerQuote.comments.length;j++)
		        	{
		        		if($scope.customerQuote.comments[j].created_by==$scope.current_user.fmno || temp=="true")
		        		{
		        			$scope.hideDelete = "false";
		        			console.log("inside Hide Delete "+ $scope.hideDelete);
		        			console.log(temp);
		        		}

		        	}

        	}

        	$scope.deleteAdmin();

        ngDialog.open({ template: 'quotePopupTemplate', scope:$scope,
        	controller: ['$scope', function($scope) {
           // controller logic
           $scope.customerQuotes = quote;
           $scope.hideEdit=adminEdit;

            $scope.customerQuotes.date=$scope.customerQuotes.date.split("T")[0];

                $scope.openEditForm = function (quote1) {

	              //ngDialog.close();
	              ngDialog.openConfirm({
                  template: '/modules/main/views/customer-quotes-edit-form.client.view.html',
                  controller: ['$scope', function($scope) {
                  // controller logic

                   $scope.customerQuotes = quote1;
                   $scope.customerQuotes.date=$scope.customerQuotes.date.split("T")[0];

                    $scope.updateQuoteForm = function() {

                       var id=$scope.customerQuotes._id;
                       console.log($scope.customerQuotes.date)
                       var currentDate = new Date(
                       						$("#date").val()	//$scope.customerQuotes.date
                       					).toISOString().split("T")[0];
                       console.log(currentDate);
                       var addlist = new CustomerQuotes({
                          by: $("#by").val(),	//$scope.customerQuotes.by,
                          to: $("#to").val(),	//$scope.customerQuotes.to,
                          description: $("#comment").val(),	//$scope.customerQuotes.description,
                          date: new Date(currentDate)

                        });
                        console.log(addlist);

                        $http.put('/customerquotes1/' +id, addlist).success(function(response){
                          console.log(response);

												 $scope.customerQuotes.by = response.by;
												 $scope.customerQuotes.to = response.to;
												 $scope.customerQuotes.description = response.description;
												 $scope.customerQuotes.date = new Date(currentDate).toISOString().split("T")[0];


                        });
                    }

                }]
              });


            }


        }]
      });

    };

    $scope.openQuoteForm = function() {
      console.log("Inside quote form");
        ngDialog.openConfirm({
        	template: '/modules/main/views/customer-quotes-form.client.view.html',
        	scope:$scope


        });

			// controller: ['$scope',  function ($scope) {
        $scope.submitQuoteForm = function(isValid) {
        	//console.log(isValid);
        	if (isValid) {
      			var addlist = new CustomerQuotes({
			        by: this.by,
			        to: this.to,
             		person: this.person,
			        description: this.description,
			        date: new Date(this.date).toISOString(),
			        created_at: new Date().toISOString()
			       });


            var mailData = {
              "emailId" : $scope.current_user.notes_email_id,
              "by" : this.by,
              "to" : this.to,
              "description" : this.description,
              "date" : this.date
            }

				$http.post('/customerquotes', addlist).success(function(response){
					$scope.to ="";
					$scope.date="",
					$scope.description ="";
					$scope.customerQuotes.push(response);
				});

          $http({
             method: 'POST',
             url: '/mail-customerquotes',
             data: mailData
         }).then(function successCallback(response) {
              //console.log("success");
          }, function errorCallback(response) {
              //console.log("error");
          });

    		}
    	}


      $scope.quotes = {
        to: this.to,
        description: this.description,
      }

    };


	$scope.find = function() {
		console.log("in find");

		var getEmployee=function()
		{
			var p=$q.defer();
			Employees.getCurrentUser( function (res) {

				Admin.list( function (res1) {
		            $scope.admin=res1;
		    	});

			$scope.current_user = res;
            $scope.by = $scope.current_user.ads_login_name;
            p.resolve();

		    });

		 return p.promise;
    	}

		var getAllEmployee = function(){
			var p = $q.defer();
			Employees.list(function(res){
				$scope.all_employees = res;
				 p.resolve();
			});
			return p.promise;
		};

		var getAllQuotes = function(){
			var p = $q.defer();
			$http({
				method: 'GET',
				url: '/customerquotes',
			}).then(function successCallback(response) {
				   $scope.customerQuotes = response.data;
				   	 p.resolve();
				   }, function errorCallback(response) {
				    console.log("error");
			});
			return p.promise;
		};

			var getAdmins = function(){
				var p=$q.defer();
				Admin.list( function(res){
					$scope.admin=res;
					p.resolve();
				});

				return p.promise;
			};

			getEmployee()
			.then(getAllEmployee)
			.then(getAllQuotes)
			.then(getAdmins)
			.then($scope.processQuotes);

			//$scope.admin();


		}; //End of find function


		$scope.admin = function(){
			var temp="false";

				$scope.hideDelete="true";

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
		}
		$scope.saveComment = function(id,msg) {

			var quote = _.findWhere($scope.customerQuotes, {_id: id});
			var comment = {};
			//comment.date_time = new Date();
			comment.comment = msg;
			var d = new Date();
			comment.created_at = d.toISOString();
			comment.comment_likes = [];
			comment.created_by = $scope.current_user.fmno;
			comment.created_by_name = $scope.current_user.ads_login_name;
			quote.comments.push(comment);
			$http({
				method: 'PUT',
				url: '/customerquotes',
				data: quote
				}).then(function successCallback(response) {

					console.log(response.data);

				   	//Socket.emit('quoteUpdated', {});

				   	 _.each( $scope.customerQuote.comments , function (comment, key) {

				   	 	_.extend(comment, response.data.comments[key]);

				   	 	console.log(comment);
				   	 	$scope.deleteAdmin();

				   	 });

				   	//$scope.find();


				}, function errorCallback(response) {
				    console.log("error");
				});

		}; //End of saveComment function

		//processQuotes: summary
		//1. Add isLiked attribute
		//2. replace FMNO by name

		$scope.processQuotes = function(){
			_.each($scope.customerQuotes, function(quote){

				_.forEach(quote.likes, function(like){
					 if(like.fmno == $scope.current_user.fmno)
					 {
						 quote.isLiked = true;
					 }
				})

				quote.names = _.map(quote.likes, function(like){
					return like.name;
				});

				quote.names = quote.names.reverse();
					//console.log(quote.names);

				_.each(quote.comments, function (comment){
					console.log(comment);
					_.forEach(comment.comment_likes, function(like){

						 if(like.fmno == $scope.current_user.fmno)
						 {
							 comment.isLiked = true;
						 }
					})

					comment.names = _.map(comment.comment_likes, function(like){
						return like.name;
					});
					console.log(comment.names);

					// comment.isLiked = _.contains(comment.comment_likes, $scope.current_user.fmno);
					// comment.names = _.map(_.filter($scope.all_employees, function (emp) { return _.contains(comment["comment_likes"], emp.FMNO);}), function (e) { return e.Name;});
					comment.created_by_name = $scope.current_user.ads_login_name;
					comment.names = comment.names.reverse();
						//console.log(comment.names);
				});
			});
		 };

		$scope.updateLikes = function(quote, comment){

			console.log(quote.comments);
			if (typeof comment === 'undefined')
			{ //like or unlike article
				if(quote.isLiked==true){
				quote.likes.splice(quote.likes.indexOf($scope.current_user.fmno), 1);
				}
				else{
					var likedItem = {
						name: $scope.current_user.ads_login_name,
						fmno: $scope.current_user.fmno
					}
					quote.likes.push(likedItem);

				}
				quote.isLiked = !quote.isLiked;
				console.log(quote);

			}
			else{ //like or unlike comment on article
				if(comment.isLiked==true){
					comment.comment_likes.splice(comment.comment_likes.indexOf($scope.current_user.fmno),1);
				}
				else{
					var likedItem = {
						name: $scope.current_user.ads_login_name,
						fmno: $scope.current_user.fmno
					}

					comment.comment_likes.push(likedItem);
				}

				_.each(quote.comments, function(commentObj){
					console.log(commentObj._id);
					if(commentObj._id == comment._id){
						console.log(commentObj._id);
						comment.isLiked = !comment.isLiked;
						_.extend(commentObj, comment);
					}
				});
				console.log(quote.comments);
			}

			$http({
				method: 'PUT',
				url: '/customerquotes',
				data: quote
				}).then(function successCallback(response) {
					$scope.processQuotes();
					Socket.emit('quoteUpdated', {});
				}, function errorCallback(response) {
				    console.log("error");
			});
		};


		$scope.deleteComment = function (quote, comment)

			{
				var temp;
				var del;
				console.log(comment);
				console.log(quote.comments);

				var idx = _.indexOf(quote.comments, _.findWhere(quote.comments, {_id : comment._id}));

				console.log(idx);
				quote.comments.splice(idx,1);


				$http({
				method: 'PUT',
				url: '/customerquotes',
				data: quote
				}).then(function successCallback(response) {
					console.log(response);
				}, function errorCallback(response) {
				    console.log("error");
				});
			}

	} //End of scope function

]);
