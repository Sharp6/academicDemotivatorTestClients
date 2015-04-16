var five = require("johnny-five"), board = new five.Board();
var request = require('request');
var exec = require('child_process').exec;

board.on("ready", function() {

	var createButton = function(num,label) {
		var button = new five.Button({
			pin: num,
			isPullup: true 
		});

		var responseToRequest = function(err,res,body) {
			body = "Hello " + label + ". " + body;
			exec('say -v Karen ' + body, function(err,stdout,stderr) {
				console.log(stdout);
			});
		}

		var pressFunction = function() {
			request('http://127.0.0.1:3000/api/insult/'+label, responseToRequest);
		}

		button.on("press", pressFunction);
		return button;
	}

	createButton(8, "peter");
	createButton(9, "gilles");
	createButton(10, "philip");

});