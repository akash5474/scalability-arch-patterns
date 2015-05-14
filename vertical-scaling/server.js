import http from 'http';

const pid = process.pid;

export default function() {
  http.createServer((req, res) => {
    for ( var i = 1e7; i > 0; i-- ) {}
    console.log('Handling request from', pid);
    console.log('Hello from', pid, '\n');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from ' + pid);
  }).listen(8080, () => {
    console.log('Started', pid);
  });
};