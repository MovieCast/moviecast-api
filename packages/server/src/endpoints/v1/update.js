import Joi from 'joi';
import Boom from 'boom';
import { valid } from 'semver';
import { PlatformService, VersionService } from '../../services';

module.exports = [{
  method: 'GET',
  path: '/update/{platform}/{version}/{channel?}',
  handler: async (req) => {
    try {
      const { platform: platformName, version, channel = 'stable' } = req.params;

      if(!valid(version)) {
        return Boom.badRequest('The specified version is not SemVer-compatible');
      }

      const platform = await PlatformService.findByName(platformName);
      if(!platform) {
        return Boom.badRequest('The specified platform is not valid');
      }

      const versions = await VersionService.getLastestVersion(platform, version, channel);

      return versions;
    } catch(e) {
      console.log(e);
      return Boom.internal();
    }
  }
}, {
  method: 'POST',
  path: '/update',
  handler: async (req) => {
    try {
      const { title, notes, platforms: platformNames, version: versionName, channel } = req.payload;

      if(!valid(versionName)) {
        return Boom.badRequest('The specified version is not SemVer-compatible');
      }

      // TODO: Validate platform
      // if (!PlatformService.isValidPlatform()) {
      //   return Boom.badRequest('One ore more specified platform(s) are/is not valid');
      // }

      if(await VersionService.doesVersionExist(versionName)) {
        return Boom.badRequest('The specified version does already exist');
      }

      const platforms = await PlatformService.findByNames(platformNames);

      const version = await VersionService.createVersion({ name: versionName, title, notes, channel, platforms });
      if(!version) {
        return Boom.internal('Unexpected error occured, version was not created');
      }

      return version;
    } catch (e) {
      console.log("Hellooww??");
      console.log(e);
      return Boom.internal();
    }
  },
  options: {
    auth: 'jwt',
    validate: {
      payload: {
        title: Joi.string(),
        notes: Joi.string(),
        platforms: Joi.array().items(Joi.string()).required(),
        version: Joi.string().required(),
        channel: Joi.string().default('stable')
      }
    }
  }
}]