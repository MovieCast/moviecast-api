import mongoose from 'mongoose';
import { ChannelSchema } from './channel.model';

export const VersionSchema = mongoose.Schema({
  name: String,

  title: String,
  notes: String,

  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset'
  }],

  channel: {
    type: String,
    default: 'stable' 
  },

  platforms: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Platform'
  }]
}, { timestamps: true });

// VersionSchema.pre('save', function (next) {
//   this.platforms = this.assets.map(asset => asset.platform);
// });

// class VersionModel extends mongoose.Model {
//   get platforms() {
//     this.
//   }
// }

const VersionModel = mongoose.model('Version', VersionSchema);
export default VersionModel;