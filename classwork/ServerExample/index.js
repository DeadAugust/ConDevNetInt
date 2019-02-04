/*
  August Luhrs
  Connected Devices and Networked Interaction Spring 2019
  Week 1 Assignment

  based on Four line static file server
  by Tom Igoe
*/
var express = require('express');	        // include the express library
var server = express();					          // create a server using express
server.use('/',express.static('public')); // serve static files from /public

server.get('/apathy', apathy);
server.get('/mysterio', mysterio);
server.get('/divisive', divisive);
server.get('/honey', honey);

function apathy(request, response){
  response.send('You have reached the home page of Admiral Apathy, I guess. There\'s nothing really worth doing here. Or anywhere.');
}

function mysterio(request, response){
  response.send('Feast your eyes on the occult domain of the grand Dolph Mysterio! Only the initiated can find the secret entrance to our ritual chamber website....');
}

function divisive(request, response){
  response.send('I am 99.99998% sure you have reached the experimental online research database of Dr. David Divisive. Please don\'t touch anything. Or at least record your results very well if you do.');
}

function honey(request, response){
  response.send('RAWAWERRRRGGGGG');
}


/* example from class
function getTime(request, response){
  var now = new Date();
  var what = request.query;
  console.log('you sent: ' + JSON.stringify(what));

  response.send(now);
  response.end();
}

function checkAge(request, response){
  var yourAge = request.params.age;
  response.send('you are ' + yourAge);
  response.end();
}

server.get('/age/:age', checkAge);
server.get('/time', getTime);
*/


server.listen(8080);                      // start the server
