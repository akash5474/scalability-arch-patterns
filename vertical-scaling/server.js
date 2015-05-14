import http from 'http';

const pid = process.pid;

export default function() {
  http.createServer((req, res) => {
    console.log('Handling request from', pid);
    console.log('Hello from', pid, '\n');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from ' + pid);
  }).listen(8080, () => {
    console.log('Started', pid);
  });
};