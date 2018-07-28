import pkg from '../../../package.json';

module.exports = {
  method: 'GET',
  path: '/status',
  handler: async () => ({
    name: pkg.name,
    version: pkg.version,
    uptime: process.uptime() | 0
  })
}