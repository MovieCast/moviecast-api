import mongoose from 'mongoose';

export const AnnouncementsSchema = mongoose.Schema({
  index: String,
  content: String,
}, { timestamps: true });


const AnnouncementsModel = mongoose.model('Announcements', AnnouncementsSchema);
export default AnnouncementsModel;