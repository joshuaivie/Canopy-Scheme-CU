"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class HasVerifiedPayment {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const hasVerifiedPayment = await auth.user.hasVerifiedPayment();
    if (!hasVerifiedPayment)
      return response.forbidden({
        msg:
          "None of your payments is verified. You can't perform this action yet"
      });

    await next();
  }
}

module.exports = HasVerifiedPayment;
