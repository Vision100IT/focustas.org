if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-unassigned-import
  require('now-env');
}

const next = require('next');
const pinoColada = require('pino-colada');
const config = require('config');
const {start, stop} = require('./server');

let pretty;
let server;

const dev = config.get('dev');

const app = next({dev});

if (config.dev) {
  pretty = pinoColada();
  pretty.pipe(process.stdout);
}

module.exports = app
  .prepare()
  .then(async () => {
    server = await start({
      pretty,
      handle: app.getRequestHandler()
    });
  })
  .catch(error => console.error(error));

process.once('SIGUSR2', async () => {
  try {
    await stop(server);
    process.kill(process.pid, 'SIGINT');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
