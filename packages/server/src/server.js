import 'dotenv/config';

import path from 'path';
import Hapi from 'hapi';

import * as database from './database';
import { UserService } from './services';

const server = new Hapi.Server({ port: 3000, host: '0.0.0.0' });

(async() => {
  await database.connect();

  // Setup hapi auth
  await server.register(require('hapi-auth-jwt2'));

  // Setup hapi auth
  server.auth.strategy('jwt', 'jwt', {
    key: 'testsecret', // TODO: Add configuration...
    validate: async (decoded, h) => ({ isValid: await UserService.validateJwtToken(decoded) }),
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Register our endpoints
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