import useragent from 'express-useragent';
import { Platform } from '@moviecast/api-models';

class PlatformService {
  private readonly platforms: any;

  constructor() {
    this.platforms = {
      LINUX: 'linux',
      DARWIN: 'darwin',
      WINDOWS: 'windows',
      ANDROID: 'android'
    }
  }

  async findByName(platformName) {
    return Platform.findByName(platformName);
  }

  async findByNames(platformNames) {
    return Platform.findByNames(platformNames);
  }

  async isValidPlatform(platformName) {
    const platform = await this.findByName(platformName);

    return !!platform;
  }

  detectFromRequest(request) {
    const ua = useragent.parse(request.headers['user-agent']);
  
    if(ua.isWindows) return this.platforms.WINDOWS;
    if(ua.isAndroid) return this.platforms.ANDROID;
    if(ua.isMac) return this.platforms.DARWIN;
    if(ua.isLinux) return this.platforms.LINUX;

    return null;
  }
}

export default new PlatformService();