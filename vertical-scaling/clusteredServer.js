import cluster from 'cluster';
import os from 'os';
import server from './server';

const pid = process.pid;

if ( cluster.isMaster ) {
  let forkableCPUs = os.cpus().length - 1;
  console.log('PID:', pid);
  console.log('forkableCPUs:', forkableCPUs);
  for ( let i = 0; i < forkableCPUs; i++ ) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    if ( code != 0 && !worker.suicide ) {
      console.log('Worker crashed, starting new worker.');
      cluster.fork();
    }
  });

  process.on('SIGUSR2', () => {
    console.log('Restarting workers...');
    let workers = Object.keys(cluster.workers);

    function restartWorkers(i) {
      if ( i >= workers.length ) return;
      let worker = cluster.workers[ workers[i] ];

      console.log('Stopping worker:', worker.process.pid);
      worker.disconnect();

      worker.on('exit', () => {
        if (!worker.suicide) return;
        let newWorker = cluster.fork();
        newWorker.on('listening', () => {
          restartWorkers(i + 1);
        });
      });
    }

    restartWorker(0);
  });
} else {
  server();
}