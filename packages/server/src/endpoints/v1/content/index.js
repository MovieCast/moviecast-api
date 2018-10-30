import Boom from 'boom';
import { Movie, Show } from '@moviecast/api-models';
import { ContentService } from '../../../services';

const baseProjection = {
  _id: 1,
  imdb_id: 1,
  title: 1,
  year: 1,
  genres: 1,
  images: 1,
  rating: 1,
};

const query = {
  $or: [{
    num_seasons: {
      $gt: 0
    }
  }, {
    torrents: {
      $exists: true
    }
  }]
};

const MovieService = new ContentService({
  model: Movie,
  projection: {
    ...baseProjection,
    released: 1,
  },
  query
});

const ShowService = new ContentService({
  model: Show,
  projection: {
    ...baseProjection,
    tvdb_id: 1,
    num_seasons: 1
  },
  query
});

/**
 * 
 * @param {string} baseName The base name
 * @param {ContentService} service The service to use
 */
function createContentRoutes(baseName, service) {
  return [{
    method: 'GET',
    path: `/${baseName}`,
    handler: async () => await service.getPages()
  }, {
    method: 'GET',
    path: `/${baseName}/{page}`,
    handler: async (req) => {
      const { page } = req.params;
      const {
        sort, order, genre, keywords
      } = req.query;
  
      const s = sort ? service.sortContent({
        sort,
        order: order ? parseInt(order, 10) : -1,
        keywords: keywords && keywords !== ''
      }) : null;
  
      let query = {
        ...MovieService.query
      };
  
      if (genre && genre !== 'all') {
        query = {
          ...query,
          genres: genre.toLowerCase()
        };
      }
  
      if (keywords && keywords !== '') {
        query = {
          ...query,
          $text: {
            $search: keywords
          }
        };
      }
  
      return service.getPage(page, s, query);
    }
  }, {
    method: 'GET',
    path: `/${baseName}/detail/{id}`,
    handler: async ({ params: { id } }) => {
      const movie = await service.getItem(id);
      if (movie) {
        return movie;
      }
      return Boom.notFound(`Item with imdbid ${id} is not found`);
    }
  }];
}

module.exports = [
  ...createContentRoutes('movies', MovieService),
  ...createContentRoutes('shows', ShowService)
];