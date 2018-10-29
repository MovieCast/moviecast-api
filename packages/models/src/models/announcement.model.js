import mongoose from 'mongoose';

export const AnnouncementSchema = mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });


const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);
export default AnnouncementModel;