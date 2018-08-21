import Boom from 'boom';
import { Version } from '@moviecast/api-models';

import { PlatformService } from '../../../services';

module.exports = {
  method: 'GET',
  path: '/latest/{platform?}',
  handler: async (request) => {
    try {
      let platform = request.params.platform;

      if (!platform) {
        platform = PlatformService.detectFromRequest(request);

        if (!platform) {
          return Boom.internal('Platform not supported');
        }
      }


      // TODO: Use aggregate instead, this is faster.
      const versions = await Version
        .find({ channel: 'stable' })
        .sort({
          createdAt: 'desc'
        })
        .limit(10)
        .populate({
          path: 'assets',
          match: { platform }
        })
        .exec();

      const filteredVersions = versions.filter(version => version.assets.length > 0);


      return {
        platform,
        version: filteredVersions[0]
      }
    } catch(e) {
      console.log(e);
      return Boom.internal(e);
    }
  }
}