'use strict';

const Database = use('Database');
const Link = use('App/Helpers/LinkGen');
const UserGroup = use('App/Models/UserGroup');
const randomString = require('crypto-random-string');
const UserGroupMember = use('App/Models/UserGroupMember');
const InternalServerError = use('App/Exceptions/InternalServerError');

class GroupController {
  /**
   * Get group information about about a given user.
   */
  async getGroupForUser({ response, auth }) {
    try {
      if (auth.user.is_group_owner == true) {
        const group = await auth.user.group().with('members').fetch();
        const { id, token, members, ...data } = group.toJSON();
        const invite_url = Link.createGroupInviteLink('group.join', id, token);
        return response.status(200).json({ group: { ...data, invite_url, members } });
      }

      return response.status(200).json({ group: await auth.user.group().fetch() });
    } catch (err) {
      throw new InternalServerError();
    }
  }

  /**
   * Allow a user to join a user group via a unique URL.
   */
  async join({ request, response, auth }) {
    const { group_id } = request.params;

    try {
      await UserGroupMember.create({ user_id: auth.user.id, user_group_id: group_id });
      return response.status(200).json({ msg: 'Sucessfully joined group' });
    } catch (err) {
      throw new InternalServerError();
    }
  }

  /**
   * Create a user group if only the user hasn't aleady created
   * a group or belongs to any group.
   */
  async create({ request, response, auth }) {
    const { name } = request.only(['name']);

    try {
      const trx = await Database.beginTransaction();
      await UserGroup.create({ name, user_id: auth.user.id, token: randomString({ length: 16, type: 'base64' }) }, trx);
      auth.user.is_group_owner = true;
      await auth.user.save(trx);
      trx.commit();

      return response.status(200).json({ msg: 'Group has been created.' });
    } catch (err) {
      throw new InternalServerError();
    }
  }

  /**
   * Delete a user group created by an authenticated user.
   */
  async delete({ response, auth }) {
    const trx = await Database.beginTransaction();

    try {
      await auth.user.group().delete(trx);
      auth.user.is_group_owner = false;
      await auth.user.save(trx);
      trx.commit();

      return response.status(200).json({ msg: 'Group successfully deleted' });
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = GroupController;
