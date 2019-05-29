"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class NotInUserGroup {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    if (auth.user.is_group_owner == true)
      return response.forbidden({ msg: "You already created a group" });
    const groupCount = await auth.user.group().first();
    if (groupCount !== null)
      return response.forbidden({ msg: "You aleady belong to a group." });
    await next();
  }
}

module.exports = NotInUserGroup;
