;!function(exports, undefined) {
	
	var channel = {
		name: 'Websockets.Server',
		publish: function(topic, entity){
			throw new Error('Cannot publish to Websocket Server');
		},
		init: function(callback){
			var self = this;
			//var server = ;//.listen(80);

			if(!this.port){
				this.port = 8081;
			}
			
			var server = require('socket.io').listen(self.port);
			
			server.sockets.on('connection', function (socket) {
				var socketChannel = new self.constructor('myConn', {
					type: 'Websockets.Socket',
					socket: socket
				});
				
				self.emit('entity', new self._Entity({
					Channel: socketChannel
				}));
			});
			
		}
	}
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return channel;
		});
	} else {
		exports.Channel = channel;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);