;!function(exports, undefined) {
	
	var serverChannel = require(__dirname+'/channels/server.js').Channel;
	var socketChannel = require(__dirname+'/channels/socket.js').Channel;
	
	var channels = {
		name: 'TCP',
		isChannelList: true,
		Server: serverChannel,
		Socket: socketChannel
	};
	
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return channels;
		});
	} else {
		exports.Channels = channels;
	}

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);