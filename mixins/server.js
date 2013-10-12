if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['socket.io', './socket'], function(socketio, fdsocket){
	var mixin = {
		//called when first mixing in the functionality
		init: function(cfg, callback){
			var self = this;
			var errs = false;
			
			for(var key in cfg){
				self.set(key, cfg[key]);
			}

			if(!self.get('port')){
				self.set(port, 8080);
			}
			
			self.publish('fdwebsockets.start', {});
			self.emit('fdwebsockets.ready', self);

			if(callback){
				callback(errs, self);
			}
		},
		//called when something is published to this channel
		publish: function(topic, data){
			var self = this;
			switch(topic){
				case 'fdwebsockets.start':
					self.server = socketio.listen(self.get('port'));

					self.server.sockets.on('connection', function (socket) {
						var newChannel = new self.constructor({
							mixins: [
								{
									type: fdsocket,
									socket: socket,
									test: 'yeah'
								}
							]
						});

						newChannel.onAny(function(evData){
							self.emit(this.get('id')+'.'+this.event, evData, this);
						});

						newChannel.publish('_intro', {
							id: self.get('id'),
							name: self.get('name')
						});

						self.emit('socket.ready', newChannel);
					});

					self.emit('fdwebsockets.server.started', self.server, self);
					break;
				case 'fdwebsockets.stop':
				
					break;
			}
		}
	};
	
	return mixin;
});

