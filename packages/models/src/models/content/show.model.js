import mongoose from 'mongoose';
import contentSchema from './content.schema';

const ShowSchema = mongoose.Schema({
  ... contentSchema,
  tvdb_id: Number,
  country: String,
  network: String,
  air_day: String,
  air_time: String,
  status: String,
  num_seasons: Number,
  last_updated: Number,
  lastest_episode: {
    type: Number,
    default: 0
  },
  episodes: {
    type: [{
      tvdb_id: Number,
      season: Number,
      episode: Number,
      title: String,
      overview: String,
      date_based: Boolean,
      first_aired: Number,
      torrents: []
    }]
  }
});

ShowSchema.index({
  title: 'text',
  _id: 1
})

const ShowModel = mongoose.model('Show', ShowSchema);

export default ShowModel;