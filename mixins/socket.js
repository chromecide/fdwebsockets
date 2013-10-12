if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? 'socket.io' : ''], function(socketio){
	if(!socketio){
		socketio = window.io;
	}
	var mixin = {
		//called when first mixing in the functionality
		init: function(cfg, callback){
			var self = this;
			var errs = false;
			
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

			if(callback){
				callback(errs, self);
			}
			self.emit('fdwebsockets.ready', cfg);
		},
		//called when something is published to this channel
		publish: function(topic, data){
			
			var self = this;
			if(self.socket){
				
				self.socket.emit('fdmsg', {
					topic: topic,
					data: data.get()
				});	
			}
		}
	};
	
	return mixin;
});
