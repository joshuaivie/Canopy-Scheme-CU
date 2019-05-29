'use strict';

const Encryption = use('Encryption');
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Unauthorized = use('App/Exceptions/UnauthorizedException');
const InternalServerError = use('App/Exceptions/InternalServerError');
const Kue = use('Kue');
const Job = use('App/Jobs/SignupEmail');

class UserController {
  /**
   * Registers a new user.
   */
  async register({ request, response, auth }) {
    const details = request.only(['email', 'matric_no', 'password', 'firstname', 'lastname', 'telephone_no']);

    try {
      const user = await User.create({ ...details });
      Kue.dispatch(Job.key, { user }, { priority: 'normal', attempts: 3, remove: true, jobFn: () => {} });

      return await auth.withRefreshToken().attempt(details.email, details.password);
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  /**
   * Login a given user.
   */
  async login({ request, auth }) {
    const { email, password } = request.only(['email', 'password']);

    try {
      return await auth.withRefreshToken().attempt(email, password);
    } catch (err) {
      throw new Unauthorized('Invalid email or password');
    }
  }

  /**
   * Signout a user.
   */
  async signout({ request, response }) {
    const { refresh_token } = request.only(['refresh_token']);

    try {
      const decrypted = Encryption.decrypt(refresh_token);
      const refreshToken = await Token.findBy('token', decrypted);
      if (!refreshToken) return response.status(401).send({ msg: 'Sorry, you are not currently logged in' });

      await refreshToken.delete();
      return response.status(200).send({ msg: 'Logout successful' });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  /**
   * Refresh a users token.
   */
  async refreshToken({ request, auth }) {
    const { refresh_token } = request.only(['refresh_token']);

    try {
      return await auth.newRefreshToken().generateForRefreshToken(refresh_token);
    } catch (err) {
      throw new Unauthorized('Invalid refresh token');
    }
  }
}

module.exports = UserController;
