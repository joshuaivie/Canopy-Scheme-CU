"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { sanitize } = use("Validator");
const User = use("App/Models/User");

class InviteeNotInUserGroup {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const rules = {
      invitee_email: "decode_uri_and_decrypt|normalize_email"
    };
    const { invitee_email } = sanitize(request.params, rules);

    try {
      const user = await User.query()
        .where("email", invitee_email)
        .first();
      if (user == null)
        return response.forbidden({ msg: "Invalid invite link." });
      request.params.invitee = user; // add invitee to the header

      const groupCount = await user.group().first();
      if (groupCount !== null) {
        return response.forbidden({ msg: "You already belong to a group." });
      }
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }

    await next();
  }
}

module.exports = InviteeNotInUserGroup;
