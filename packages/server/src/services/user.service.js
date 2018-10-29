import { User } from '@moviecast/api-models';

class UserService {
  async getUser(id) {
    return await User.findById(id);
  }
}

export default new UserService();