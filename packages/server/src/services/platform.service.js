import useragent from 'express-useragent';

class PlatformService {
  constructor() {
    this.platforms = {
      LINUX: 'linux',
      DARWIN: 'darwin',
      WINDOWS: 'windows',
      ANDROID: 'android'
    }
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