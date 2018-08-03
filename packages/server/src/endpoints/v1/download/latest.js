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

      const version = await Version
        .find({ channel: { name: 'stable' }})
        .sort({
          createdAt: 'desc'
        })
        .limit(10)
        .populate('assets', { platform });

      
      return {
        platform,
        version
      }
    } catch(e) {
      console.log(e);
      return Boom.internal(e);
    }
  }
}