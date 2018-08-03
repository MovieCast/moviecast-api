import mongoose from 'mongoose';

export const ChannelSchema = mongoose.Schema({
  name: String
});

const ChannelModel = mongoose.model('Channel', ChannelSchema);
export default ChannelModel;