var routing = [{
    path: '/api',
    service: 'api-service',
    idx: 0
  }, {
    path: '/',
    service: 'webapp-service',
    idx: 0
}];

var httpProxy = require('http-proxy');
var ports = require('seaport').connect('localhost:9090');

var proxy = httpProxy.createProxyServer({});
var balancerPort = 8080;

require('http').createServer(function(req, res) {
  var route;
  routing.some(function(entryRoute) {
    route = entryRoute;
    return req.url.indexOf( entryRoute.path ) === 0;
  });

  var servers = ports.query(route.service);
  if (!servers.length) {
    res.writeHead(502);
    return res.end('Bad Gateway');
  }

  route.idx = ( route.idx + 1 ) % servers.length;
  console.log('Balancing Load...\n\tRoute:', route);
  console.log('Available Servers...\n\t', servers);
  console.log('\tCurrent Idx:', route.idx);
  proxy.web(req, res, {target: servers[ route.idx ]});
}).listen(balancerPort, function() {
  console.log('Started Load Balancer...\n\tPort:', balancerPort);
});