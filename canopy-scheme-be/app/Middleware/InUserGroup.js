'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class InUserGroup {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    const groupCount = await auth.user.group().first();
    if (groupCount == null) return response.status(200).json({ msg: 'You currently do not belong to any group.' });
    await next();
  }
}

module.exports = InUserGroup;
