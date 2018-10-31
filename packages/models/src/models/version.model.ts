import { Typegoose, prop, Ref, arrayProp } from 'typegoose';
import { Platform } from './platform.model';

export class Asset extends Typegoose {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  platform: Ref<Platform>;

  @prop({ required: true })
  hash: string;

  @prop({ required: true })
  size: number;
}

export class Version extends Typegoose {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  title: string;

  @prop()
  notes?: string;

  @arrayProp({ items: Asset })
  assets: [Asset];

  @prop({ default: 'stable' })
  channel: string;

  @arrayProp({ itemsRef: Platform })
  platforms?: Ref<Platform>[];

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export default new Version().getModelForClass(Version, { schemaOptions: { timestamps: true } });