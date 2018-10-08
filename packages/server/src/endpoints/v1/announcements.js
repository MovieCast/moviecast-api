import Boom from 'boom';
import { AnnouncementsService } from '../../services';

module.exports = [{
    method: 'GET',
    path: '/announcements/{id}',
    handler: async (req) => {
        try {
            const { id = 'latest' } = req.params;
            if (id == 'latest') {
                const Announcement = await AnnouncementsService.getLatestAnnouncement();
                return Announcement;
            } else {
                const Announcement = await AnnouncementsService.getAnnouncement(id);
                return Announcement;
            }
        } catch (e) {
            console.log(e);
            return Boom.internal();
        }
    }
}, {
    method: 'GET',
    path: '/announcements',
    handler: async (req) => {
        try {
            const Announcement = await AnnouncementsService.getAnnouncements();

            return Announcement;
        } catch (e) {
            console.log(e);
            return Boom.internal();
        }
    }
}, {
    method: 'POST',
    path: '/announcements',
    handler: async (req) => {
        try {
            const { content } = req.payload;


            const Announcement = await AnnouncementsService.createAnnouncement({ content: content });
            if (!Announcement) {
                return Boom.internal('Unexpected error occured, Announcement was not created');
            }

            return Announcement;
        } catch (e) {
            console.log("Hellooww??");
            console.log(e);
            return Boom.internal();
        }
    }
}, {
    method: 'POST',
    path: '/announcements/update',
    handler: async (req) => {
        try {
            const { id, content } = req.payload;


            const Announcement = await AnnouncementsService.updateAnnouncement({ id: id, content: content });
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