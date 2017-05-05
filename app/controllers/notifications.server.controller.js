var mail = require('./../services/mail.js');
var cron = require('node-schedule');
var Q = require('q');

var mongoose = require('mongoose'),
	Events = mongoose.model('News'),
	Customerquotes = mongoose.model('Customerquote'),
	Successstories = mongoose.model('Successstory'),
	Pocs = mongoose.model('Poc'),
    _= require('lodash');

var currentDate;
var sevenDaysBack;
var eventSummary;
var customerQuoteSummary;
var successStorySummary;
var pocSummary;

exports.notificationSummary = function(){
	var rule = new cron.RecurrenceRule();
	rule.dayOfWeek = 1;
	rule.hour = 4;
	rule.minute = 30;
	cron.scheduleJob(rule,function(){
		currentDate = new Date().toISOString().split("T")[0];
    sevenDaysBack = new Date(new Date().setDate(new Date().getDate()-7)).toISOString().split("T")[0];

		Q.fcall(getEvents)
		.then(getCustomerQuotes)
		.then(getSuccessStories)
		.then(getPocs)
		.catch(function (error) {
		    // Handle any error from all above steps
		})
		.done(prepareMailBody);
	});
};

var getEvents= function(){
	var p = Q.defer();
	Events.find({"startDate": {$lte: currentDate}, "startDate": {$gt: sevenDaysBack}})
   	.exec(function(err, data) {
		if (err) {
			console.log("error:"+err);
		} else {
			eventSummary = data || [];
			console.log(eventSummary);
			p.resolve();
		}
	});
	return p.promise;
};
var getCustomerQuotes= function(){
	var p = Q.defer();
	Customerquotes.find({"created_at": {$lte: currentDate}, "created_at": {$gt: sevenDaysBack}})
   	.exec(function(err, data) {
		if (err) {
			console.log("error:"+err);
		} else {
			customerQuoteSummary = data || [];
			p.resolve();
		}
	});
	return p.promise;
};
var getSuccessStories= function(){
	var p = Q.defer();
	Successstories.find({"created_at": {$lte: currentDate}, "created_at": {$gt: sevenDaysBack}})
   	.exec(function(err, data) {
		if (err) {
			console.log("error:"+err);
		} else {
			successStorySummary = data || [];
			p.resolve();
		}
	});
	return p.promise;
};
var getPocs= function(){
	var p = Q.defer();
	Pocs.find({"created_at": {$lte: currentDate}, "created_at": {$gt: sevenDaysBack}})
   	.exec(function(err, data) {
		if (err) {
			console.log("error:"+err);
		} else {
			pocSummary = data || [];
			p.resolve();
		}
	});
	return p.promise;
};

var prepareMailBody = function(){
	if(eventSummary.length > 0 &&  customerQuoteSummary.length > 0 && successStorySummary.length > 0 && pocSummary.length > 0)
	{

	var baseURL = "http://interface.intranet.mckinsey.com:3000/#!";
	var body= "<div style='font-size:14px'><span>"
			+ "Dear All,<br/><br/>"
			+ "<b>Weekly summary for <a href='" + baseURL + "'>interFACE:</a></b><br/></span>";

	if(eventSummary.length > 0){
		var eventBody = "<br/><span><u>New Events this week</u></br></span>"
						+ "<ul>";
		_.each(eventSummary, function(item){
			eventBody = eventBody + "<li>" + item.eventText + "</li>";
		});
		eventBody = eventBody + "</ul>";
		body = body + eventBody;
	}

	if(customerQuoteSummary.length > 0){
		var customerQuoteBody = "<br/><span><u>New entries for <a href='"+ baseURL+"/customerQuotes'>Customer Quotes</a></u><br/></span>"
						+ "<ul>";
		_.each(customerQuoteSummary, function(item){
			customerQuoteBody = customerQuoteBody + "<li> Appreciation from " + item.by + " to "+ item.to +" </li>";
		});
		customerQuoteBody = customerQuoteBody + "</ul>";
		body = body + customerQuoteBody;
	}

	if(successStorySummary.length > 0){
		var successStoryBody = "<br/><span><u>New entries for <a href='"+ baseURL+"/successstories'>Success Stories</a></u><br/></span>"
						+ "<ul>";
		_.each(successStorySummary, function(item){
			successStoryBody = successStoryBody + "<li>" + item.title + " by "+ item.by +" </li>";
		});
		successStoryBody = successStoryBody + "</ul>";
		body = body + successStoryBody;
	}

	if(pocSummary.length > 0){
		var pocBody = "<br/><span><u>New entries for <a href='"+ baseURL+"/pocs'>PoC</a></u><br/></span>"
						+ "<ul>";
		_.each(pocSummary, function(item){
			pocBody = pocBody + "<li>" + item.title + "</li>";
		});
		pocBody = pocBody + "</ul>";
		body = body + pocBody;
	}
	body = body + "<br/><span><b>Best Regards,<br/>interFACE Team</b></span></div>";
	sendMail(body);

	}
};


var sendMail = function (body){
	var mailFrom = ["interface_team@mckinsey.com"];
	var mailTo = ["SD-Appdev_TCS_Offshore@mckinsey.com"];
	var mailSubject = "<ODC-Interface>: What's new this week!!";
	var mailBody = body;
	var isHTML = true;
	var result = mail.sendMail(mailFrom, mailTo, mailSubject, mailBody, isHTML);
}
