var Cylon = require('cylon');

Cylon.robot({
  // voice for espeak can be specified either in one string or as params for the adaptor.
  // both connections below will reproduce with the same voice.
  // connections: { speech: { adaptor: 'speech', language: 'en, gender: 'f', 'voice: '3' } },
  connections: {
    server: { adaptor: 'mqtt', host: 'mqtt://localhost:1883' },
    speech: { name:'speech', adaptor: 'speech', voice: 'en-m3', speed: 130 }
  },

  devices: {
    mouth: { driver: 'speech', connection: 'speech' }
  },

  work: function(my) {
    my.server.subscribe('insults');

    my.server.on('message', function(topic,data) {
      my.mouth.say(data);
    });
  }
}).start();