import { prop, arrayProp, index } from 'typegoose';
import Content from './content.schema';

@index({ title: 'text', _id: 1 })
export class Movie extends Content {
  @prop({ default: 'en' })
  language: string;

  @prop({ required: true })
  released: number;

  @prop()
  trailer?: string;

  @prop()
  certification?: string;

  @arrayProp({ items: Array })
  torrents: [];
}

export default new Movie().getModelForClass(Movie);