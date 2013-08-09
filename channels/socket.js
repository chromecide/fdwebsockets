;!function(exports, undefined) {
	
	var channel = {
		name: 'Websockets.Socket',
		init: function(callback){
			var self = this;
			if(!self.socket){
				throw new Error('No Socket Supplied');
			}
			
			var x = self.socket.$emit;

			self.socket.$emit = function(){
				var event = arguments[0];
				var feed  = arguments[1];
				
				self.emit(event, feed);
				self.emit('entity', feed);
				
			    //To pass listener  
				x.apply(this, Array.prototype.slice.call(arguments));       
			};
			
			self.socket.on('close', function(){
				self.emit('close', {});
			});
			
			if(callback){
				callback(self);
			}
		},
		publish: function(topic, entity){
			this.emit('entity', entity);
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