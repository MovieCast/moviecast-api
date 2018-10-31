import { Typegoose, prop } from 'typegoose';

export class User extends Typegoose {
  @prop({ required: true })
  nickname: string;

  @prop({
    required: true,
    // @ts-ignore
    select: false
  })
  username: string;

  @prop({
    required: true,
    // @ts-ignore
    select: false
  })
  password: string;

  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;
}

export default new User().getModelForClass(User, { schemaOptions: { timestamps: true } })