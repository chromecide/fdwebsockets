if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['socket.io'], function(socketio){
	var mixin = {
		init: function(cfg){
			var self = this;
			
			for(var key in cfg){
				if(key=='socket'){
					self.socket = cfg.socket;	
				}else{
					self.set(key, cfg[key]);	
				}
			}
			
			if(!self.socket){
				var host = self.get('host');
				self.socket = socketio.connect(host);	
			}
			
			self.socket.on('disconnect', function(){
				delete self.socket;
				self.emit('disconnected', self);
			});
			
			self.socket.on('fdmsg', function (data) {
				self.emit(data.topic, data.data);
			});
			
			self.emit('fdwebsockets.ready', {});
		},
		publish: function(topic, data){
			var self = this;
			if(self.socket){
				self.socket.emit('fdmsg', {
					topic: topic,
					data: data
				});	
			}
		}
	}
	
	return mixin;	
});
