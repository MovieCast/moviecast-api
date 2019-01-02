import { Typegoose, prop, Ref,  } from 'typegoose';
import { User } from './user.model';


export class Announcement extends Typegoose {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  content: string;

  @prop({ required: true, ref: User })
  author: Ref<User>;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export default new Announcement().getModelForClass(Announcement, { schemaOptions: { timestamps: true } });