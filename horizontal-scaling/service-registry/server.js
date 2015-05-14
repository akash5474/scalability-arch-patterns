var http = require('http');
var ports = require('seaport').connect('localhost:9090');

var serviceType = process.argv[2];
var pid = process.pid;
var port = ports.register(serviceType);

http.createServer(function(req, res) {
  for ( var i = 1e7; i > 0; i-- ) {}
  console.log('Handling request from', pid);
  console.log('Hello from\n\tServiceType: '
    + serviceType + '\t' + 'PID: ' + pid);
  console.log('Registered to Seaport...\n\tPort: ' + port);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from\n\tServiceType: '
    + serviceType + '\t' + 'PID: ' + pid + '\n');
}).listen(port, function() {
  console.log('Started...\n\tServiceType: '
    + serviceType + '\t' + 'PID: ' + pid);
  console.log('Registered to Seaport...\n\tPort: ' + port);
});