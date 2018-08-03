import Boom from 'boom';
import { Movie } from '@moviecast/api-models';

import { ContentService } from '../../../services';

const service = new ContentService(Movie);

module.exports = [{
  method: 'GET',
  path: '/movies',
  handler: async (request, h) => {
    try {
      return service.getList({...request.query});
    } catch (e) {
      console.log(e);
      return Boom.internal(e);
    }
  }
}]