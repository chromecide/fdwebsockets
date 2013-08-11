if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['socket.io'], function(socketio){
	
	var mixin = {
		init: function(cfg){
			var self = this;
			
			for(var key in cfg){
				self.set(key, cfg[key]);
			}
			
			if(!self.get('port')){
				self.set(port, 8080);
			}
			
			self.publish('fdwebsockets.start', {});
			self.emit('fdwebsockets.ready', self);
		},
		publish: function(topic, data){
			var self = this;
			switch(topic){
				case 'fdwebsockets.start':
					self.server = socketio.listen(self.get('port'));
					self.server.sockets.on('connection', function (socket) {
						var newChannel = new self.constructor({
							mixins: [
								{
									type: 'fdwebsockets/mixins/socket',
									socket: socket
								}
							]
						});
						
						newChannel.on('fdwebsockets.ready', function(){
							self.emit('socket.connected', newChannel);
						});
					});
					
					self.emit('fdwebsockets.server.started', self.server);		
					break;
				case 'fdwebsockets.stop':
				
					break;
			}
		}
	}
	
	return mixin;	
});
