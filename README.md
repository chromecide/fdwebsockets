fdwebsockets
============

Socket.io mixins for FluxData

Usage

Server (NodeJS)

```
require(['FluxData'], function(FluxData){
   var websocketServer = new FluxData.Channel({
   		id: 'mySocketServer',
   		mixins: [
   			{
   				type: 'fdwebsockets/mixins/server',
   				port: 8080
   			}
   		]
   });
   
   websocketServer.on('socket.connected', function(socketChannel){
   		socketChannel.publish('Welcome', {
   			Hello: 'World'
   		});
   		
   		socketChannel.onAny(function(data){
   			console.log(this.event);
   			console.log(data);
   		});
   });
});
```

Client (Browser or NodeJS)

```
require(['FluxData'], function(FluxData){
	var clientSocket = new FluxData.Channel({
		mixins: [
			{
				type: 'fdwebsockets/mixins/client',
				host: 'http://localhost:8080'
			}
		]
	});
	
	clientSocket.on('Welcome', function(data){
		console.log(data);
	});
	
	clientSocket.publish('MyEvent', {
		CustomAttribute: 'CustomData'
	});
});
```