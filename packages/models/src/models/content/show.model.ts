import Content from './content.schema';
import { prop, arrayProp, index } from 'typegoose';

export interface IEpisode {
  tvdb_id: Number,
  season: Number,
  episode: Number,
  title: String,
  overview: String,
  date_based: Boolean,
  first_aired: Number,
  torrents: []
}

@index({ title: 'text' })
export class Show extends Content {
  @prop({ required: true })
  tvdb_id: number;

  @prop({ required: true })
  country: string;

  @prop({ required: true })
  network: string;

  @prop({ required: true })
  air_day: string;

  @prop({ required: true })
  air_time: string;

  @prop({ required: true })
  status: string;

  @prop({ required: true })
  num_seasons: number;

  @prop({ required: true })
  last_updated: number;

  @prop({ default: 0 })
  lastest_episode: number;

  @arrayProp({ items: Array })
  episodes: IEpisode[]
}

export default new Show().getModelForClass(Show);