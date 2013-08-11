;!function(exports, undefined) {
	
	var serverMixin = require(__dirname+'/mixins/server.js').Mixin;
	var socketMixin = require(__dirname+'/mixins/socket.js').Mixin;
	
	var mixins = {
		name: 'fdwebsockets',
		isMixinList: true,
		Server: serverMixin,
		Socket: socketMixin
	};
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return mixins;
		});
	} else {
		exports.mixins = mixins;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);