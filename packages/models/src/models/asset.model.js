import mongoose from 'mongoose';

export const AssetSchema = mongoose.Schema({
  name: String,
  platform: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Platform'
  },
  hash: String,
  size: Number,
  version: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Version'
  }
});

const AssetModel = mongoose.model('Asset', AssetSchema);
export default AssetModel;