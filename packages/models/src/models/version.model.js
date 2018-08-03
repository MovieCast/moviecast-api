import mongoose from 'mongoose';
import { ChannelSchema } from './channel.model';

export const VersionSchema = mongoose.Schema({
  name: String,

  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset'
  }],

  channel: ChannelSchema,

  notes: String
});

const VersionModel = mongoose.model('Version', VersionSchema);
export default VersionModel;