var seaport = require('seaport');
var server = seaport.createServer();

server.on('register', function(service) {
  console.log('Service registered', service);
});
server.listen(9090);