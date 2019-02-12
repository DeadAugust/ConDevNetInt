/*
  August Luhrs
  Connected Devices and Networked Interaction
	Tom Igoe -- Spring 2019
  Week 2 Assignment

  based on p5 fadecandy examples from Scanlime's fadecandy github repo:
	https://github.com/scanlime/fadecandy/tree/master/examples/p5js
*/

// Connect to the local instance of fcserver
var WebSocketAddress = "ws://198.162.1.6:7890"; //roompi's local IP

//Show LED pixel locations.
var showPixelLocations = true;
//Change the HTML Id of the canvas.
var canvasId = "strip64_flames"

var im;

function setup(){
	var canvas = createCanvas(800, 200);
	canvas.id(canvasId);
	socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.


	im = loadImage("images/flames.jpeg"); // Load a sample image
	ledStrip(0, 64, width/2, height/2, width/70, 0, false);
	frameRate(60);
}

function draw() {

	// Scale the image so that it matches the width of the window
	var imHeight = im.height * width / im.width;

	// Scroll down slowly, and wrap around
	var speed = 0.05;
	var y = (millis() * -speed) % imHeight;

	// Use two copies of the image, so it seems to repeat infinitely
	image(im, 0, y, width, imHeight);
	image(im, 0, y + imHeight, width, imHeight);

	//Send to fcServer.
	drawFrame();
}
