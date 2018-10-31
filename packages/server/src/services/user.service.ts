import { User } from '@moviecast/api-models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Boom from 'boom';
import { ObjectId } from 'bson';

class UserService {
  async getUser(id) {
    return await User.findById(id);
  }

  /**
   * Creates a jwt token for given user
   * @param {User} user User to get token for.
   */
  createJwtToken(user) {
    const secret = 'testsecret'; // TODO: Add configuration...

    return jwt.sign({
      id: user._id,
      username: user.username
    }, secret, {
      algorithm: 'HS256', // Might change to HS512
      expiresIn: '1h'
    });
  }

  /**
   * Creates a hash for given password
   * @param {string} password Password to hash.
   */
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  /**
   * Validates the credentials of given username
   * @param {*} config An object with the username and password. 
   */
  async validateCredentials({ username, password }: { username: string, password: string }) {
    const user = await User.findOne({ username }).select('+password');

    if(user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return Boom.badRequest('Invalid username or password');
  }

  /**
   * Validates a jwt token
   * @param {*} jwt Decoded jwt token
   */
  async validateJwtToken({ id }: { id: ObjectId }) {
    const user = await this.getUser(id);

    return user != null;
  }
}

export default new UserService();