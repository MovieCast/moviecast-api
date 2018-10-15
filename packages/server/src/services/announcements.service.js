import { Announcements } from '@moviecast/api-models';

class AnnouncementsService {
    /**
     * Returns the Announcements
     */
    async getLatestAnnouncement() {
        var AnnouncementMap = [];

        const Announcement = await Announcements.find({}).sort({ createdAt: 'desc' }).limit(1);

        Announcement.forEach(function (announcement) {
            AnnouncementMap.push({ 'ID': announcement._id, 'Announcement': announcement.content, 'Date': announcement.createdAt });
        });

        return AnnouncementMap;
    }

    async getAnnouncement(id) {
        var AnnouncementMap = [];

        const Announcement = await Announcements.find({
            _id: id
        });

        Announcement.forEach(function (announcement) {
            AnnouncementMap.push({ 'ID': announcement._id, 'Announcement': announcement.content, 'Date': announcement.createdAt });
        });

        return AnnouncementMap;
    }

    async getAnnouncements() {
        var AnnouncementMap = [];

        const Announcement = await Announcements.find({}).sort({ createdAt: 'desc' });

        Announcement.forEach(function (announcement) {
            AnnouncementMap.push({ 'ID': announcement._id, 'Announcement': announcement.content, 'Date': announcement.createdAt });
        });

        return AnnouncementMap;
    }

    async createAnnouncement({ content = 'potato' } = {}) {
        try {
            var AnnouncementMap = [];

            const Announcement = await Announcements.create({
                content
            });

            AnnouncementMap.push({ 'ID': Announcement._id, 'Announcement': Announcement.content, 'Date': Announcement.createdAt });

            return AnnouncementMap;
        } catch (e) {
            console.log(e);
        }
    }

    async updateAnnouncement({ id, content = 'potato' } = {}) {
        try {
            var AnnouncementMap = [];

            const Announcement = await Announcements.find(
                {
                    _id: id
                }
            ).update(
                {
                    _id: id
                },
                {
                    $set: {
                        "content": content
                    }
                }
            );

            AnnouncementMap.push({ 'ID': Announcement._id, 'Announcement': Announcement.content, 'Date': Announcement.createdAt });

            return AnnouncementMap;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AnnouncementsService();
