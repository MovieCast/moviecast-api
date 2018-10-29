import Boom from 'boom';
import { AnnouncementService } from '../../services';

module.exports = [{
  method: 'GET',
  path: '/announcements/{id}',
  handler: async ({ params: { id = 'latest' } } = {}) => {
    try {
      let annoucement;
      if (id === 'latest') {
        annoucement = await AnnouncementService.getLatestAnnouncement();
      } else {
        annoucement = await AnnouncementService.getAnnouncement(id);
      }

      if(annoucement != null) {
        return annoucement;
      }

      return Boom.notFound('Given announcement was not found or removed');
    } catch (e) {
      console.log(e);
      return Boom.internal();
    }
  }
}, {
  method: 'GET',
  path: '/announcements',
  handler: async () => {
    try {
      return await AnnouncementService.getAnnouncements();
    } catch (e) {
      console.log(e);
      return Boom.internal();
    }
  }
}, {
  method: 'POST',
  path: '/announcements',
  handler: async ({ payload }) => {
    try {
      const Announcement = await AnnouncementService.createAnnouncement(payload);
      if (!Announcement) {
        return Boom.internal('Unexpected error occured, Announcement was not created');
      }

      return Announcement;
    } catch (e) {
      console.log(e);
      return Boom.internal();
    }
  }
}, {
  method: 'POST',
  path: '/announcements/{id}',
  handler: async ({ params: { id }, payload }) => {
    try {
      const Announcement = await AnnouncementService.updateAnnouncement(id, payload);
      if (!Announcement) {
          return Boom.internal('Unexpected error occured, Announcement was not updated');
      }

      return Announcement;
    } catch (e) {
      console.log("Hellooww??");
      console.log(e);
      return Boom.internal();
    }
  }
}]