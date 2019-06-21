"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { sanitize } = use("Validator");
const UserGroup = use("App/Models/UserGroup");
const UserGroupMember = use("App/Models/UserGroupMember");
const { createTimestamp } = use("App/Helpers/DateHelper");

class IsValidGroupInviteLink {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // Update param.group_id with decrypted group_id. Validators do not support params validation currently.
    const payload = {
      group_id: request.params.group_id
    };
    request.params.group_id = sanitize(payload, {
      group_id: "decode_uri_and_decrypt"
    }).group_id;
    const { token, group_id } = request.params;

    try {
      const group = await UserGroup.findOrFail(group_id);
      if (group.token !== token) throw Error("Group token doesn't match");

      // Todo: lock database row here to prevent data race.
      const totalMembers = (await group
        .members()
        .where("joined", true)
        .count("* as total")
        .first()).total;

      if (totalMembers >= group.maximum_group_members) {
        return response.forbidden({
          msg: "Failed to join group. Maximum number of group members reached."
        });
      }
    } catch (err) {
      return response.forbidden({ msg: "Invalid group invitation link." });
    }

    await next();
  }
}

module.exports = IsValidGroupInviteLink;
