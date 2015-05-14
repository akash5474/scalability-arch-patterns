import cluster from 'cluster';
import os from 'os';
import server from './server';

if ( cluster.isMaster ) {
  let forkableCPUs = os.cpus().length - 1;
  console.log('cpus', forkableCPUs);
  for ( let i = 0; i < forkableCPUs; i++ ) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    if ( code != 0 && !worker.suicide ) {
      console.log('Worker crashed, starting new worker.');
      cluster.fork();
    }
  });
} else {
  server();
}