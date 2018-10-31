import { UserService } from '../../../services';

module.exports = {
  method: 'POST',
  path: '/authenticate',
  config: {
    pre: [
      { method: async (req) => await UserService.validateCredentials(req.payload), assign: 'user' }
    ],
    handler: (request) => {
      return {
        token: UserService.createJwtToken(request.pre.user)
      };
    }
  }
}