import { Typegoose, prop, arrayProp } from "typegoose";

export interface IRating {
  percentage: number;
  watching: number;
  votes: number;
}

export interface IImages {
  background: string;
  poster: string;
}

export default class Content extends Typegoose {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  year: number;

  @prop({ required: true })
  slug: string;

  @prop({ required: true })
  synopsis: string;

  @prop({ required: true })
  runtime: number;

  @prop({ required: true })
  rating: IRating;

  @prop({ required: true })
  images: IImages;

  @arrayProp({ items: String })
  genres: [string]
}
