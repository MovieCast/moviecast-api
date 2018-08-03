import { Movie } from '@moviecast/api-models';

class ContentService {
  constructor(model) {
    this.model = model;
  }

  // _applySorting(query, { sort }) {

  // }

  // _applyPagination(query, { offset = 0, limit = 50 }) {
  //   if(offset) {
  //     query.skip(offset);
  //   }

  //   if(limit) {
  //     query.
  //   }
  // }

  getMeta() {
    return {
      page: 1,
      limit: 1,
      count: 1,
      pageCount: 1,
      totalCount: 1,
      next: '?page=2',
      previous: '?page=0',
      hasNext: true,
      hasPrevious: false,

      self: '?page=1',
      first: '?page=1',
      last: '?page=2'
    }
  }

  async getList({ offset = 0, limit = 50 }) {
    const pageMeta = {
      page: 0,
      limit: 50,
      total: 0
    }

    try {
      const query = this.model.find({});

      if(offset > 0) {
        pageMeta.offset = parseInt(offset, 10);
      }

      if(limit > 0 && limit <= 50) {
        pageMeta.limit = parseInt(limit, 10);
      }

      query.skip(pageMeta.offset);
      query.limit(pageMeta.limit);

      const result = await query.exec();
      const total = await this.model.count();

      return {
        meta: this.getMeta(),
        result
      }
    } catch(e) {
      console.log(e);
    }
  }
}

export default ContentService;