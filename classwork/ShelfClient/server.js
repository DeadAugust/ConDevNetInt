/*
based on Mimi Yin's "hello world sockets server"
https://github.com/mimiyin/collective-play-s19/blob/master/00_helloworld/02_helloworld-sockets/server.js
*/


// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for individual clients to connect
io.sockets.on('connection',
	// Callback function on connection
  // Comes back with a socket object
	function (socket) {

		console.log("We have a new client: " + socket.id);

    // Listen for data from this client
		socket.on('data', function(data) {
      // Data can be numbers, strings, objects
			console.log("Received: 'data' " + data);

			// Send it to all clients, including this one
			io.sockets.emit('data', data);

		});

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
