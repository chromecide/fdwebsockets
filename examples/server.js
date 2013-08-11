var requirejs = require('requirejs');

process.fdpaths = {
	FluxData: __dirname+'/../../FluxData',
	//mixins: '../../FluxData/lib/mixins',
	fdwebsockets: __dirname+'/../'
}

requirejs.config({
    baseUrl: __dirname,

    nodeRequire: require?require:undefined,
    paths: process.paths
});

requirejs(['FluxData/index'], function(FluxData){
	var websocketServer = new FluxData.Channel({
		id: 'mySocketServer',
		mixins: [
			{
				type: 'fdwebsockets/mixins/server',
				port: 8081
			}
	   	]
	}, requirejs);
	   
	websocketServer.on('socket.connected', function(socketChannel){
		
		socketChannel.publish('Welcome', {
			Hello: 'World'
		});
	   		
		socketChannel.onAny(function(data){
			console.log(this.event);
			console.log(data);
		});
	});
	
	var staticWebServer = new FluxData.Channel({
		mixins: [
			{
				type: 'mixins/http/static_server',
				webroot: __dirname,
				port: 8080,
				paths: {
					'FluxData': __dirname+'/../../FluxData/',
					'mixins': __dirname+'/../../FluxData/lib/mixins/',
					'fdwebsockets': __dirname+'/../',
					'requirejs.js': __dirname+'/../node_modules/requirejs/require.js',
					'eventemitter2.js': __dirname+'/../../FluxData/node_modules/eventemitter2/lib/eventemitter2.js',
					'util.js': __dirname+'../../../FluxData/lib/browser_util.js'
				}
			}
		]
	});
	
	staticWebServer.on('http.mixin.ready', function(){
		staticWebServer.publish('http.start', {});	
	});
	
})

