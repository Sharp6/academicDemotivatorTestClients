(function (updater){

	var socketio = require('socket.io');
	var mqtt = require('mqtt');
	var request = require('request');

	updater.init = function(server) {

		var mqttClient = mqtt.connect('mqtt://localhost:1883');
		//var mqttClient = mqtt.connect('mqtt://test.mosquitto.org');
		var io = socketio.listen(server);

		mqttClient.on('connect', function() {
			console.log('MQTT connected.');
			mqttClient.subscribe('insults');
		});

		io.sockets.on("connection", function(socket) {
			console.log("socket was connected.");
			//socket.emit("showThis", "This is from the server.");
			socket.on("performInsult", function(data) {
				request('https://shielded-mesa-3585.herokuapp.com/api/insult/'+data.person, function(err,res,body) {	
					mqttClient.publish('insults', "Hello " + data.person + ". " + body);
				});
				//socket.broadcast.emit("incoming insult", data.person);
			});
		});
	};
})(module.exports);