"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class VerifyEmail {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const { email_verified } = auth.user;

    if (email_verified != true) {
      return response.forbidden({
        emailNotVerified: true,
        msg: "Your email is not verified, you cannot perform this action"
      });
    }
    await next();
  }
}

module.exports = VerifyEmail;
