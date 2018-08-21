import { Version } from '@moviecast/api-models';

class VersionService {
  /**
   * Returns the latest version
   * 
   * The return version is based on the specified
   * platform and version.
   * 
   * @param {ObjectId} platform The platform objectid
   * @param {String} version    The version (semver compatible)
   */
  async getLastestVersion(platform, version, channel = 'stable') {
    const versions = await Version.find({
      name: { $gt: version },
      channel,
      platforms: platform,
    });

    console.log(versions);

    return versions;
  }

  /**
   * Returns whether the specified version already exists
   * 
   * @param {String} version The version
   */
  async doesVersionExist(version) {
    const found = await Version.findOne({ name: version });

    return !!found;
  }

  async createVersion({name, title, notes, channel = 'stable', platforms } = {}) {
    try {
      const version = await Version.create({
        name,
        title,
        notes,
        channel,
        platforms
      });

      return version;
    } catch(e) {
      console.log(e);
    }
  }
}

export default new VersionService();