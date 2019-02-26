/* Web-Connected Thermostat
  by August Luhrs
  Feb. 25 2019
  for Connected Devices and Networked Interactions
  Tom Igoe -- ITP Spring 2019

  based on tigoe/NodeServerExamples:
    rotary-encoder
    gpio-input
    SimpleConnDevClient

  and this rpi-dht-sensor
  https://www.npmjs.com/package/rpi-dht-sensor
*/

//client stuff
const https = require('https');
var hostName = 'tigoe.io'; // add the host name here
var temperature = 0.0;
var humidity = 0.0;

// make the sensor data a JSON object:
var sensorData = JSON.stringify({
    'temperature': temperature,
    'humidity': humidity
});

// make the POST data a JSON object and stringify it:
var postData =JSON.stringify({
  'macAddress': 'b8:27:eb:dd:b8:d5',    // add your mac address here
  'sessionKey': '4e233ce4-946c-47a5-8102-dfb3c09bfe83',    // add your session key here
  'data': sensorData
});

var options = {
  host: hostName,
  port: 443,
  path: '/data',
	method: 'POST',
	headers: {
    'User-Agent': 'nodejs',
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

function callback(response) {
  var result = '';		// string to hold the response

  // as each chunk comes in, add it to the result string:
  response.on('data', function (data) {
    result += data;
  });

  // when the final chunk comes in, print it out:
  response.on('end', function () {
    console.log(result);
  });
}

// make the actual request:
var request = https.request(options, callback);	// start it
request.write(postData);						// send the data
request.end();									    // end it
console.log('checking data\n' + postData); //just to check

//gpio set up
let Gpio = require('onoff').Gpio; //onoff library
let yellow1 = new Gpio(25, 'out');
let yellow2 = new Gpio(8, 'out'); //set pins
let yellow3 = new Gpio(7, 'out');
let green = new Gpio(12, 'out');
//led states
let greenState = 0;
let yellowStates = [0, 1, 0]; //cycling through yellow LEDs, middle starts on
//encoder set up
const rotaryEncoder = require('onoff-rotary'); //encoder library
const myEncoder = rotaryEncoder(5, 6); //encoder input pins
//encoder listener function
function readRotation(direction){
  console.log(direction);
  if (direction > 0) {
      console.log('Encoder rotated right');
      for (var i = yellowStates.length - 1; i >= 0; i--){
        if (yellowStates[i] == 1 && i != 2){
	  console.log('lights right');
          yellowStates[i] = 0;
          yellowStates[i+1] = 1;
        }
      }
    }
  else {
      console.log('Encoder rotated left');
      for (var i = 0; i < yellowStates.length; i++){
        if (yellowStates[i] == 1 && i != 0){
	  console.log('lights left');
          yellowStates[i] = 0;
          yellowStates[i-1] = 1;
        }
      }
    }
  //led array cycle
  yellow1.writeSync(yellowStates[0]);
  yellow2.writeSync(yellowStates[1]);
  yellow3.writeSync(yellowStates[2]);
  greenState = !greenState;
  green.writeSync(greenState);
  console.log(yellowStates);
}

//dht11 set up
var rpiDhtSensor = require('rpi-dht-sensor');
var dht = new rpiDhtSensor.DHT11(2); // GPIO pin?
function read () {
  var readout = dht.read();
    console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
        'humidity: ' + readout.humidity.toFixed(2) + '%');
    temperature = readout.temperature.toFixed(2);
    humidity = readout.humidity.toFixed(2);
    setTimeout(read, 5000);
}


//terminal signals start
console.log('on');
//start the encoder event listener
myEncoder.on('rotation', readRotation);
//read the sensor
read();
