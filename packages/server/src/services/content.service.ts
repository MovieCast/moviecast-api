import { Model, Document } from 'mongoose';

export default class ContentService<T extends Document> {
  /**
   * The mongodb content model
   */
  private readonly model: Model<T, {}>;

  /**
   * Projection which defines what content to show
   */
  private readonly projection: Object;

  /**
   * Amount of content items per page
   */
  private readonly pageSize: number;

  /**
   * 
   */
  readonly query: Object;

  /**
   *
   */
  constructor({
    model,
    projection,
    pageSize = 50,
    query
  }: {
    model: Model<T, {}>,
    projection: Object,
    pageSize?: number,
    query: Object
  }) {
    this.model = model;
    this.projection = projection;
    this.pageSize = pageSize;
    this.query = query;
  }

  /**
   *
   * @param {string} s
   * @param {string} o
   */
  sortContent({
    sort,
    order,
    score = false
  }: {
    sort: string,
    order: number,
    score: boolean
  }) {
    const result: any = {};

    if (score) {
      result.score = {
        $meta: 'textScore'
      };
    }

    switch (sort.toLowerCase()) {
      case 'title':
      case 'name':
        return {
          ...result,
          title: order
        };
      case 'rating':
        return {
          ...result,
          'rating.votes': order,
          'rating.percentage': order
        };
      case 'released':
      case 'updated':
        return {
          ...result,
          released: order,
          latest_episode: order
        };
      case 'trending':
        return {
          ...result,
          'rating.watching': order
        };
      case 'year':
        return {
          ...result,
          year: order
        };
      default:
        return {
          ...result,
          'rating.votes': order,
          'rating.precentage': order,
          'rating.watching': order
        };
    }
  }

  async getPages() {
    const totalResults = await this.model.estimatedDocumentCount(this.query);
    return {
      totalPages: Math.ceil(totalResults / this.pageSize),
      totalResults
    };
  }

  /**
   * Get a formatted page object
   * @param {number} p - The page number
   * @param {Object} sort - The sort object
   * @param {Object} query - The query
   */
  async getPage(p, sort, query = { ...this.query }) {
    const page = Number.isNaN(p) ? 0 : Number(p) - 1;
    const offset = page * this.pageSize;

    let aggregateQuery: any = [{
      $match: query,
    }, {
      $project: this.projection
    }];

    if (sort) {
      aggregateQuery = [...aggregateQuery, {
        $sort: sort
      }];
    }

    // FIXES SORT ISSUE
    aggregateQuery = [...aggregateQuery, {
      $skip: offset
    }, {
      $limit: this.pageSize
    }];

    const results = await this.model.aggregate(aggregateQuery);
    const totalResults = await this.model.estimatedDocumentCount(query);

    return {
      page: page + 1,
      totalPages: Math.ceil(totalResults / this.pageSize),
      totalResults,
      results
    };
  }

  /**
   * Gets a single item by given id.
   * @param {string} id The item id
   * @param {Object} projection The projection
   */
  async getItem(id, projection = null) {
    return this.model.findById(id, projection);
  }
}

// class ContentService {
//   constructor(model) {
//     this.model = model;
//   }

//   // _applySorting(query, { sort }) {

//   // }

//   // _applyPagination(query, { offset = 0, limit = 50 }) {
//   //   if(offset) {
//   //     query.skip(offset);
//   //   }

//   //   if(limit) {
//   //     query.
//   //   }
//   // }

//   getMeta() {
//     return {
//       page: 1,
//       limit: 1,
//       count: 1,
//       pageCount: 1,
//       totalCount: 1,
//       next: '?page=2',
//       previous: '?page=0',
//       hasNext: true,
//       hasPrevious: false,

//       self: '?page=1',
//       first: '?page=1',
//       last: '?page=2'
//     }
//   }

//   async getList({ offset = 0, limit = 50 }) {
//     const pageMeta = {
//       page: 0,
//       limit: 50,
//       total: 0
//     }

//     try {
//       const query = this.model.find({});

//       if(offset > 0) {
//         pageMeta.offset = parseInt(offset, 10);
//       }

//       if(limit > 0 && limit <= 50) {
//         pageMeta.limit = parseInt(limit, 10);
//       }

//       query.skip(pageMeta.offset);
//       query.limit(pageMeta.limit);

//       const result = await query.exec();
//       const total = await this.model.count();

//       return {
//         meta: this.getMeta(),
//         result
//       }
//     } catch(e) {
//       console.log(e);
//     }
//   }
// }

// export default ContentService;