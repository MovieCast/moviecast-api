import mongoose from 'mongoose';

export const PlatformSchema = mongoose.Schema({
  name: String,
  aliases: [String]
});

class PlatformModel extends mongoose.Model {
  static findByName(platformName) {
    return this.findOne({
      $or: [{
        name: platformName
      }, {
        aliases: platformName
      }]
    });
  }

  static findByNames(platformNames) {
    return this.find({
      $or: [{
        name: { $in: platformNames }
      }, {
        aliases: { $in: platformNames }
      }]
    }).exec();
  }
}

PlatformSchema.loadClass(PlatformModel);

export default mongoose.model('Platform', PlatformSchema);