import path from 'path';
import Hapi from 'hapi';
const server = new Hapi.Server({ port: 3000, host: '0.0.0.0' });

(async() => {
  await server.register({
    plugin: require('@moviecast/hapi-endpoint'),
    options: {
      path: path.join(__dirname, 'endpoints')
    }
  });

  await server.start();

  console.info(`Server started at ${server.info.uri}`);
})();