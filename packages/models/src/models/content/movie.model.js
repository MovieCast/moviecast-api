import mongoose from 'mongoose';
import contentSchema from './content.schema';

const MovieSchema = mongoose.Schema({
  ... contentSchema,
  language: {
    type: String,
    default: 'en'
  },
  released: Number,
  trailer: {
    type: String,
    default: null
  },
  certification: String,
  torrents: []
});

MovieSchema.index({
  title: 'text',
  imdb_id: 'text',
  _id: 1
})

const MovieModel = mongoose.model('Movie', MovieSchema);

export default MovieModel;