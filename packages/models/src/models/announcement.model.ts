import { Schema, model } from 'mongoose';

export const AnnouncementSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });


const AnnouncementModel = model('Announcement', AnnouncementSchema);
export default AnnouncementModel;