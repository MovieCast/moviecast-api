import { Announcement } from '@moviecast/api-models';

import UserService from './user.service';

class AnnouncementsService {
  /**
   * Returns the Announcements
   */
  async getLatestAnnouncement() {
    const annoucements = await Announcement
      .find({})
      .sort({ createdAt: 'desc' })
      .limit(1)
      .populate('author');

    return annoucements.length == 1 ? annoucements[0] : null;
  }

  async getAnnouncement(id) {
    return await Announcement
      .findById(id)
      .populate('author');
  }

  async getAnnouncements() {
    return await Announcement
      .find({}, '-author')
      .sort({ createdAt: 'desc' });
  }

  async createAnnouncement({ title, content, authorId } = {}) {
    try {
      const author = await UserService.getUser(authorId);

      return await Announcement.create({
        title,
        content,
        author
      });

    } catch (e) {
      console.log(e);
    }
  }

  async updateAnnouncement(id, { title, content, authorId } = {}) {
    try {

      return await Annoucement.findByIdAndUpdate(id, {
        title,
        content,
        authorId
      }, { new: true });

    } catch (e) {
      console.log(e);
    }
  }
}

export default new AnnouncementsService();
