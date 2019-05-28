'use strict';

const InternalServerError = use('App/Exceptions/InternalServerError');

class UserController {
  /**
   * Get profile information about a given authenticated user.
   */
  async profile({ response, auth }) {
    try {
      return response.status(200).json({ profile: await auth.user });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  /**
   * Get all the payment transactions made by a given authenticated user.
   */
  async transactions({ response, auth }) {
    try {
      return response.status(200).json({ transactions: await auth.user.transactions().fetch() });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  /**
   * Get all the table reservation made by a given authenticated user.
   */
  async reservations({ response, auth }) {
    try {
      return response.status(200).json({ reservations: await auth.user.reservations().fetch() });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }
}

module.exports = UserController;
