import { Typegoose, prop } from 'typegoose';

export class Channel extends Typegoose {
  @prop({ required: true })
  name: string
}

export default new Channel().getModelForClass(Channel);