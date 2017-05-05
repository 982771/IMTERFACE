'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	chalk = require('chalk');
	var schedule = require('node-schedule');

	var rule = new schedule.RecurrenceRule();

	rule.minute = new schedule.Range(0, 59, 1);

// schedule.scheduleJob(rule, function(){
//     console.log(rule);
//     console.log('Today is recognized by Rebecca Black!---------------------------');
// });



/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */



// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});


// Init the express application
var app = require('./config/express')(db);

// .use(cors());

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

//registering cron jobs for notifications
var notifications = require('./app/controllers/notifications.server.controller.js');
notifications.notificationSummary();


app.delete('/customerquotes_likes/:id', function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})

});

//require('./app/services/socketHelper.js')();

var	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(config.port);

io.sockets.on('connection', function(socket){
	socket.on('quoteUpdated', function(data){
		console.log("socket1");
		socket.emit('quoteUpdationCompleted',{});
	});
});
