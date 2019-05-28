'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const UserGroup = use('App/Models/UserGroup');
const Encryption = use('Encryption');
const EventInfo = use('App/Utilities/EventInfo');

class IsValidGroupInviteLink {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    // Update param.group_id with decrypted group_id. Validators do not support params validation currently.
    request.params.group_id = Encryption.decrypt(decodeURIComponent(request.params.group_id));
    const { token, group_id } = request.params;

    try {
      const group = await UserGroup.findOrFail(group_id);
      if (group.token !== token) throw Error("Group token doesn't match");
      const totalMembers = (await group.members().count('* as total').first()).total;
      const maxGroupNo = await EventInfo.maximumGroupMembers();

      if (totalMembers >= maxGroupNo) {
        return response.status(200).json({
          msg: 'Failed to join group. Maximum number of group members reached.'
        });
      }
    } catch (err) {
      return response.status(200).json({ msg: 'Invalid group invitation link.' });
    }

    await next();
  }
}

module.exports = IsValidGroupInviteLink;
