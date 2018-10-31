import { Announcement } from '@moviecast/api-models';

import UserService from './user.service';

interface AnnoucementOptions {
  title: string,
  content: string,
  authorId: string
}

class AnnouncementsService {
  /**
   * Gets the latest announcement.
   */
  async getLatestAnnouncement() {
    const annoucements = await Announcement
      .find({})
      .sort({ createdAt: 'desc' })
      .limit(1)
      .populate('author');

    return annoucements.length == 1 ? annoucements[0] : null;
  }

  /**
   * Gets an announcement by id.
   * @param id The announcement to get
   */
  async getAnnouncement(id: string) {
    return await Announcement
      .findById(id)
      .populate('author');
  }

  /**
   * Gets all the announcements sorted by creation date.
   */
  async getAnnouncements() {
    return await Announcement
      .find({}, '-author')
      .sort({ createdAt: 'desc' });
  }

  /**
   * Creates a new announcement.
   * @param config Options for new annoucement
   */
  async createAnnouncement({ title, content, authorId }: AnnoucementOptions) {
    try {
      const author = await UserService.getUser(authorId);

      return await Announcement.create({
        title,
        content,
        author
      });

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * Updates an existing announcement.
   * @param id The announcement id
   * @param config Options to update
   */
  async updateAnnouncement(id: string, { title, content, authorId }: AnnoucementOptions) {
    try {

      return await Announcement.findByIdAndUpdate(id, {
        title,
        content,
        authorId
      }, { new: true });

    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new AnnouncementsService();
