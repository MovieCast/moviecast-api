import 'dotenv/config';

import path from 'path';
import Hapi from 'hapi';

import * as database from './database';

const server = new Hapi.Server({ port: 3000, host: '0.0.0.0' });

(async() => {
  await database.connect();

  await server.register({
    plugin: require('@moviecast/hapi-endpoint'),
    options: {
      path: path.join(__dirname, 'endpoints'),
      validVersions: [1],
      version: 1
    }
  });

  await server.start();

  console.info(`Server started at ${server.info.uri}`);
})();

process.on('unhandledRejection', (err) => {
  console.log(err);
});