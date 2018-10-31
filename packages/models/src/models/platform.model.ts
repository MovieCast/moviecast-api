import { Typegoose, prop, staticMethod, ModelType } from 'typegoose';

export class Platform extends Typegoose {
  @prop({ required: true })
  name: string

  @prop()
  aliases?: [string]

  @staticMethod
  static findByName(this: ModelType<Platform> & typeof Platform, platformName: string) {
    return this.findOne({
      $or: [{
        name: platformName
      }, {
        aliases: platformName
      }]
    });
  }

  @staticMethod
  static findByNames(this: ModelType<Platform> & typeof Platform, platformNames: [string]) {
    return this.find({
      $or: [{
        name: { $in: platformNames }
      }, {
        aliases: { $in: platformNames }
      }]
    }).exec();
  }
}

export default new Platform().getModelForClass(Platform);