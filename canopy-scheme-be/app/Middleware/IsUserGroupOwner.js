'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsUserGroupOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    if (auth.user.is_group_owner != true) {
      return response.status(200).json({ msg: "You currently haven't created any group" });
    }

    await next();
  }
}

module.exports = IsUserGroupOwner;
