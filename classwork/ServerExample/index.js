/*
  Four line static file server
  This server script serves files from a subfolder called 'public'

  adapted from expressjs.com examples, 2016
  by Tom Igoe
*/
var express = require('express');	        // include the express library
var server = express();					          // create a server using express
server.use('/',express.static('public')); // serve static files from /public

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

server.listen(8080);                      // start the server
