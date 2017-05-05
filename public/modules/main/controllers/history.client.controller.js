'use strict';

angular.module('main').controller('HistoryController', ['$scope','$sce','$filter', '$http',
	function($scope,$sce,$filter,$http) {
		// Controller Logic
		// ...
		//alert("history");
		$scope.years = ['1992','1993','1994','1995','1996','1997','1998'];

		$scope.histories = "";

  //   $scope.histories= [
  //   {
  //    	"year":"2015",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>TCS-Firm FORUM Quarterly Newsletter started to share TCS insights on new and emerging trends and technologies as well as TCS news and participation in upcoming events. It includes highlights from the TCS-Firm relationship team and a snapshot of the business impact brought about by the innovative work from TCS associates.</p></li><li><p class = 'odchistory_color1'>Domain Centre of Excellence (Domain CoE) on Management Consulting Firms started. Induction manual created and competency defined in TCS Learning Management System iEvolve.</p></li><li><p class = 'odchistory_color1'>Agile Fest, a 5 day event was organized, where teams got an opportunity to network-learn-share and get awareness about Scrum Methodology and Engineering Practices. Fun-and-learn activities included Poster Making, Iterative Painting, ODC Innovista, Skit on Engineering Practices and Quiz on Agile-Scrum.</p></li><li><p class = 'odchistory_color1'>Kaizen, 2015 Ideastorm, was organized to seek ideas to make Firm applications/products more supportable and to eliminate waste by reducing support footprint. Ideas for automating repetitive manual tasks, improving performance & processes, addressing problems across application were shared and discussed.</p></li><li><p class = 'odchistory_color1'>TCS Agile Café 2015, an annual event, was organized by leading Agile practitioners within TCS and Agile CoE. After 2 scintillating successful years and 6 seasons, the 7th season was carried out as an in-person conference at 7 different cities!</p></li></ul>",
  //    	"imgpath":""
  //    },
  //   {
  //    	"year":"2014",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>eStaffing MVP implementation</p></li><li><p class = 'odchistory_color1'>Re-organization of Firm IT as SDG and MDL as 2 separate groups</p></li><li><p class = 'odchistory_color1'>Making IT Better Initiative</p></li></ul>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2013",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>ePeople implementation</p></li><li><p class = 'odchistory_color1'>World Class Support initiative - ACE Program and Support University</p></li><li><p class = 'odchistory_color1'>Excellence Initiative</p></li><li><p class = 'odchistory_color1'>Organized AppDev University (Front end focus) and Data University</p></li><li><p class = 'odchistory_color1'>JSChannel conference started by Firm</p></li><li><p class = 'odchistory_color1'>TCS Agile Café started by TCS-Firm associates</p></li><li><p class = 'odchistory_color1'>Being Agile Initiative (Scrum Maturity across locations, Product Ownership, Engineering Practices)</p></li><li><p class = 'odchistory_color1'>TCS Uruguay GDC started with members of L3 support</p></li></ul>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2012",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>Completed Finance R12 implementation</p></li><li><p class = 'odchistory_color1'>Started ePeople</p></li><li><p class = 'odchistory_color1'>Good to Great initiative</p></li></ul>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2011",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>Global Hackfest for Women of Waze</p></li><li><p class = 'odchistory_color1'>Impetus 2011 AppDev conference organized in Mumbai</p></li></ul>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2009",
  //    	"content":"<h4 class='odchistory_color'>Highlights :</h4><br><ul><li><p class = 'odchistory_color1'>Agile 2.0 - One-One Challenge initiative, Organizational Rhythm</p></li><li><p class = 'odchistory_color1'>Reduce Waste Campaign – IdeaStorm - Lean Agile</p></li><li><p class = 'odchistory_color1'>Focus on Engineering Practices</p></li></ul>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2008",
  //    	"content":"<h4 class = 'odchistory_color'>Highlights :</h4><br><p>Scrum Agile is the way of life for our Development teams. Open Source tools were experimented with and embraced by the technologists. A strong focus on institutionalizing Engineering Practices laid strong foundation for our quest of being agile. Engaged with People program to transform the HR landscape by embarking on implementation of IPP (Integrated People Processes) Program.Quick transition to take up R12 finance development and support.</p><br><h4 class = 'odchistory_color'>Contributions :</h4><br><p>ODC partnered in the Organization Change Management – Agile 2.0 and other strategic initiatives such as AppDev visioning, Frictionless and so on. Ideas like weekly sprints, DevOps, Deployer, impromptu retrospectives were generated during Idea Storm. University Programs for Front End Engineering, Data analytics and Ruby on Rails were successfully implemented across various locations. TCS partnered with SSC group to execute high value Client Engagements.</p><br><h4 class = 'odchistory_color'>Strategic Milestones :</h4><br><p>MSA extended up to Dec-2013 in 2 blocks of 2 years each. Various offshore and near shore locations like Gurgaon, Kolkata, Uruguay, Bangalore, Shanghai were setup to: Ensure round the clock coverage, Enable teams to collocate for faster delivery, Leverage TCS CoE (Center of Excellence).</p><br>",
  //    	"imgpath":""
  //    },
  //    {
  //    	"year":"2005",
  //    	"content":"<h4 class = 'odchistory_color'>Highlights :</h4><br><p>Agile methodology was introduced and adopted for the first time in AppDev. A single team for 3rd level support was formed for all applications. ODC was realigned to the organizational changes in terms of new focus on portfolios. Provided agility in team staffing by quick reduction of over 40% during 2008 recession.</p><br><h4 class = 'odchistory_color'>Contributions :</h4><br><p>TCS partnered with AppDev by welcoming the change and quickly adopting Agile development practices. The team set out on the path towards attaining excellence in Agile through participation, practice and experiments such as working software, coaches in training and workshops.Support 2.0 initiative was successfully implemented resulting in a significant support cost reduction.</p><br><h4 class = 'odchistory_color'>StrategicMilestones :</h4><br><p>Explored near shore ODC operations in Cincinnati and Edison. This was also the phase when ‘Contractual Trust’ was established by signing the MSA (Master Service Agreement) between McKinsey and TCS. TCS also partnered with MSO to start a new Periscope Development team.</p>",
  //    	"imgpath":""
  //    },

  //    {
  //    	"year":"2002",
  //    	"content":"<h4 class = 'odchistory_color'>Highlights :</h4><br><p>Offshore Development Centre (ODC) was setup in Mumbai with 15 associates in 2002.The development teams followed RUP (Rational Unified Process) during software development.	MARS (online recruiting system) was the first project to be delivered from this ODC. Successfully executed large scale projects like SAIL, ORS, Peoplenet Enhancement, Peoplelink Various technology pools were established in the ODC.</p><br><h4 class = 'odchistory_color'>Contributions :</h4><br><p>FAST (Financial Application Support Team) was on boarded in 2004 and has been supporting Firm’s financial applications since then.To support RUP methodology, a dedicated QA Team was formed to establish focus on Quality and Testing.</p><br><br><h4 class = 'odchistory_color'>Strategic Milestones :</h4><br><p>During these initial years TCS and McKinsey jointly developed Statement of Work. An offshore-onsite model was developed to leverage the time zone differences between New York and Mumbai.</p>",
  //    	"imgpath":""
  //    },


		// ];

    console.log($scope.histories);

    $scope.find = function(){

      console.log("Inside find");

        $http({
           method: 'GET',
           url: '/odchistory'
          }).then(function successCallback(response) {

            $scope.histories = response.data.reverse();
            $scope.imgs = ['2','3','4','5','6','7','8','9','10','11'];
            $scope.yearcount = $scope.years.length;
            $scope.indexx = 0;
            $scope.h1 = "";
            $scope.h2 = "";
            $scope.h3 = "";
            $scope.whichsection = 0;
            $scope.isOver = 1;
            $scope.content1 = $sce.trustAsHtml($scope.histories[0].contenthtml);
            $scope.img1 = $scope.imgs[0];
            $scope.img2 = $scope.imgs[1];
            $scope.content2 = $sce.trustAsHtml($scope.histories[1].contenthtml);

            $(document).ready(function(){

     setTimeout(function(){
       $(".year p").eq(0).css({'color':'#EF1F3B','position':'absolute','font-size':'3em'});
       $(".glyphicon-triangle-bottom").css({'color':'#009AA6'});
       $(".glyphicon-triangle-bottom").eq(0).css({'color':'#EF1F3B'});
     },500);

});


$scope.right = function(){

  if($(".timeline").length)
  {
    var yearlen = parseFloat($(".year").css('width'));
    //alert(index);
    if (($scope.indexx < $scope.histories.length-1) && $scope.isOver == 1)
    {

       // var yearlen = parseInt($(".year").css('width'));

       $scope.isOver = 0;
                $(".full_content2").on("webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd Animationend animationend",
                function(event) {
           $scope.isOver = 1;
             });
        var midpnt = parseFloat($(".timeline-wrapper").css('width'))*0.5;
        /*$(".timeline").css({left:parseFloat($('.timeline').css('left'))})
               .animate({"left":(parseFloat($('.timeline').css('left')) -yearlen)},500,"linear");*/
               $(".timeline").animate({"left":midpnt - parseFloat($('.year').eq($scope.indexx + 1).position().left) },500,"linear");
               /* $(".timeline").css({left:parseFloat($('.timeline').css('left'))})
               .animate({"left":parseFloat(100*(parseFloat($('.timeline').css('left')) -536)/parseInt($('.timeline').parent().width()))+"%"},500,"linear");*/
             // alert(parseInt(100*(parseInt($('.timeline').css('left')) -yearlen)/parseInt($('.timeline').parent().width()))+"%");
             $scope.indexx ++;
             $(".year p").css({'color':'#555','position':'relative','font-size':'2em'});
             $(".glyphicon-triangle-bottom").css({'color':'#009AA6'});
             $(".year p").eq($scope.indexx).css({'color':'#EF1F3B','position':'absolute','font-size':'3em'});
             $(".glyphicon-triangle-bottom").eq($scope.indexx).css({'color':'#EF1F3B'});
        if($scope.whichsection == 0)
        {
          $scope.content2 = $scope.histories[$scope.indexx].contenthtml;
          $scope.img2 = $scope.imgs[$scope.indexx];
          $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutLeft");
          $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInRight");
          $scope.whichsection = 1;
         }

         else
         {
          $scope.content1 = $scope.histories[$scope.indexx].contenthtml;
          $scope.img1 = $scope.imgs[$scope.indexx];
          $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutLeft");
            $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInRight");
            $scope.whichsection = 0;
         }
    }
  }
};


$scope.left = function(){
  if($(".timeline").length)
  {
    var yearlen = parseFloat($(".year").css('width'));
    //alert(index);

    if (($scope.indexx > 0) && $scope.isOver == 1)
    {
      $scope.isOver = 0;

            $(".full_content2").on("webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd Animationend animationend",
                function(event) {
           $scope.isOver = 1;
             });
            var movehowmuch = (parseFloat($(".timeline").css('left')) + (parseFloat($('.year').eq($scope.indexx).position().left) - parseFloat($('.year').eq($scope.indexx - 1).position().left)));
            $(".timeline").animate({"left":movehowmuch},500,"linear");
        // var yearlen = parseInt($(".year").css('width'));
        /*$(".timeline").css({left:parseFloat($('.timeline').css('left'))})
               .animate({"left":(parseFloat($('.timeline').css('left')) +yearlen)},500,"linear");*/
                /*$(".timeline").css({left:parseFloat($('.timeline').css('left'))})
               .animate({"left":parseFloat(100*(parseFloat($('.timeline').css('left')) +536)/parseInt($('.timeline').parent().width()))+"%"},500,"linear");*/
             // alert(parseInt(100*(parseInt($('.timeline').css('left')) +yearlen)/parseInt($('.timeline').parent().width()))+"%");
             $scope.indexx--;
             $(".year p").css({'color':'#555','position':'relative','font-size':'2em'});
             $(".glyphicon-triangle-bottom").css({'color':'#009AA6'});
             $(".year p").eq($scope.indexx).css({'color':'#EF1F3B','position':'absolute','font-size':'3em'});
             $(".glyphicon-triangle-bottom").eq($scope.indexx).css({'color':'#EF1F3B'});

            if($scope.whichsection == 0)
            {
              $scope.content2 = $scope.histories[$scope.indexx].contenthtml;
              $scope.img2 = $scope.imgs[$scope.indexx];
              $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInLeft");
              $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutRight");
              $scope.whichsection = 1;
            }

            else
            {
              $scope.content1 = $scope.histories[$scope.indexx].contenthtml;
              $scope.img1 = $scope.imgs[$scope.indexx];
              $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInLeft");
              $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutRight");
              $scope.whichsection = 0;
            }
    }
  }

};


$scope.timeclick =function(history)
{
    if($(".timeline").length)
    {

      //alert(index);
      var newindex = $scope.histories.indexOf(history);

      //alert("newindex = "+newindex+"oldindex = "+$scope.indexx);

      if ((newindex >= 0) && $scope.isOver == 1 && (newindex < $scope.indexx) &&(newindex <= $scope.histories.length-1))
      {
        var yearlen = parseFloat($(".year").css('width'));
        var movehowmuch = (parseFloat($(".timeline").css('left')) + (parseFloat($('.year').eq($scope.indexx).position().left) - parseFloat($('.year').eq(newindex).position().left)));
        $scope.isOver = 0;

        $(".full_content2").on("webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd Animationend animationend",
            function(event) {
              $scope.isOver = 1;
        });
         // alert((parseFloat($(".timeline").css('left')) + (parseFloat($('.year').eq($scope.indexx).position().left) - parseFloat($('.year').eq(newindex).position().left))));
      // var yearlen = parseInt($(".year").css('width'));
        $(".timeline").animate({"left":movehowmuch},500,"linear");
              /*$(".timeline").css({left:parseFloat($('.timeline').css('left'))})
             .animate({"left":parseFloat(100*(parseFloat($('.timeline').css('left')) +536)/parseInt($('.timeline').parent().width()))+"%"},500,"linear");*/
           // alert(parseInt(100*(parseInt($('.timeline').css('left')) +yearlen)/parseInt($('.timeline').parent().width()))+"%");
           $scope.indexx = newindex;
          $(".year p").css({'color':'#555','position':'relative','font-size':'2em'});
          $(".glyphicon-triangle-bottom").css({'color':'#009AA6'});
          $(".year p").eq(newindex).css({'color':'#EF1F3B','position':'absolute','font-size':'3em'});
          $(".glyphicon-triangle-bottom").eq(newindex).css({'color':'#EF1F3B'});

          if($scope.whichsection == 0)
          {
            $scope.content2 = $scope.histories[newindex].contenthtml;
            $scope.img2 = $scope.imgs[newindex];
            $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInLeft");
            $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutRight");
            $scope.whichsection = 1;
          }

          else
          {
            $scope.content1 = $scope.histories[newindex].contenthtml;
            $scope.img1 = $scope.imgs[newindex];
            $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInLeft");
            $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutRight");
            $scope.whichsection = 0;
          }
      }

      else if ((newindex >= 0) && $scope.isOver == 1 && (newindex > $scope.indexx) &&(newindex <= $scope.histories.length-1))
      {
        var yearlen = parseFloat($(".year").css('width'));
        var midpnt = parseFloat($(".timeline-wrapper").css('width'))*0.5;
        $scope.isOver = 0;

        $(".full_content2").on("webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd Animationend animationend",
            function(event) {
              $scope.isOver = 1;
        });
         // alert(parseFloat($('.year').eq(newindex).position().left));
      // var yearlen = parseInt($(".year").css('width'));
        $(".timeline").animate({"left":midpnt - parseFloat($('.year').eq(newindex).position().left) },500,"linear");
              /*$(".timeline").css({left:parseFloat($('.timeline').css('left'))})
             .animate({"left":parseFloat(100*(parseFloat($('.timeline').css('left')) +536)/parseInt($('.timeline').parent().width()))+"%"},500,"linear");*/
           // alert(parseInt(100*(parseInt($('.timeline').css('left')) +yearlen)/parseInt($('.timeline').parent().width()))+"%");
           $scope.indexx = newindex;
            $(".year p").css({'color':'#555','position':'relative','font-size':'2em'});
            $(".glyphicon-triangle-bottom").css({'color':'#009AA6'});
           $(".year p").eq(newindex).css({'color':'#EF1F3B','position':'absolute','font-size':'3em'});
           $(".glyphicon-triangle-bottom").eq(newindex).css({'color':'#EF1F3B'});

        if($scope.whichsection == 0)
        {
          $scope.content2 = $scope.histories[$scope.indexx].contenthtml;
          $scope.img2 = $scope.imgs[$scope.indexx];
          $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutLeft");
          $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInRight");
          $scope.whichsection = 1;
        }

        else
        {
          $scope.content1 = $scope.histories[$scope.indexx].contenthtml;
          $scope.img1 = $scope.imgs[$scope.indexx];
          $(".full_content2").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideOutLeft");
            $(".full_content1").removeClass("animated slideOutLeft slideOutRight slideInLeft slideInRight").addClass("animated slideInRight");
            $scope.whichsection = 0;
        }
      }
    }

}


        }, function errorCallback(response) {
            //console.log("error");
        });


    };
    $scope.find();

		// $scope.successResponse = function(){


  //       console.log($scope.histories);

  //   };






	}
]);
