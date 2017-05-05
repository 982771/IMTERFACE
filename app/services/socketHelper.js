//creating http server for socket.io
module.exports = function(){
	console.log("socket");
	var  config = require('./../../config/config'),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

	server.listen(config.port);

	io.socket.on('connection', function(socket){
		socket.on('quoteUpdated', function(data){
			console.log("socket1");
			socket.emit('quoteUpdationCompleted',{});
		});
	});
};
