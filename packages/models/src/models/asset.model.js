import mongoose from 'mongoose';
import { VersionSchema } from './version.model';

export const AssetSchema = mongoose.Schema({
  name: String,
  platform: {
    type: String,
    enum: ['linux', 'darwin', 'win32', 'android'] // TODO: Add all android variants (arm, etc)
  },
  hash: String,
  size: Number,
  version: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Version'
  },
  fileType: String
});

const AssetModel = mongoose.model('Asset', AssetSchema);
export default AssetModel;