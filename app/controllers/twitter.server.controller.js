'use strict';

var Twitter = require('twitter');
var _ = require('lodash');
 
var client = new Twitter({
  consumer_key: 'WS1gCdnGSpfto9Jtcxw2Nc01r',
  consumer_secret: '0V4iS9Q2mRdHAzxrZEJjSTHofdixIrztDCRcUrXFfhObmfjlsh',
  access_token_key: '3672903877-tIePeg9nYzmykrTKKTc8fSvbbBRHYetLIkKsRZc',
  access_token_secret: 'dquXbOps0wXyaAFNatDiO18SK7HKytujYQRHLjx1us42K'
});

exports.read = function(req, res) {


client.get('statuses/user_timeline',{screen_name: 'TCS_News',count:10,exclude_replies:true}, function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  res.json(tweets);
  //console.log(response);  // Raw response object. 
});

}
