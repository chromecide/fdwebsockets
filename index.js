if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./mixins/server.js', './mixins/socket.js'], function(server, socket){
	
	var mixin = {
		name: 'fdwebsockets',
		Server: server,
		Socket: socket
	};
	
	return mixin;
});