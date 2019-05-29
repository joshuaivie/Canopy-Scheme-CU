'use strict';

const Database = use('Database');
const UserGroup = use('App/Models/UserGroup');
const GroupInvite = use('App/Utilities/GroupInvite');
const randomString = require('crypto-random-string');
const UserGroupMember = use('App/Models/UserGroupMember');
const InternalServerError = use('App/Exceptions/InternalServerError');

class GroupController {
  /**
   * Get group information about a given user.
   */
  async getGroupForUser({ response, auth }) {
    try {
      if (auth.user.is_group_owner == true) {
        const group = await auth.user
          .group()
          .with('members')
          .fetch();
        return response.status(200).json({ group: group.toJSON() });
      }

      const { token, ...group } = (await (await auth.user.group().first()).group().fetch()).toJSON();
      return response.status(200).json({ group });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  async invite({ request, response, auth }) {
    const { users } = request.only(['users']);

    try {
      const group = (await auth.user.group().first()).toJSON();
      const { failed } = await GroupInvite.inviteUsers(auth.user, users, group);
      if (failed.length > 0) {
        return response.status(200).json({
          failed,
          msg: "Invitation wasn't sent to one or more email addresses."
        });
      }

      return response.status(200).json({ msg: 'Invitation(s) successfully sent.' });
    } catch (err) {
      console.log(err);
      throw new InternalServerError();
    }
  }

  /**
   * Allow a user to join a user group via a unique URL.
   */
  async join({ request, response }) {
    // `invitee` gets added in the InviteeNotInUserGroup middleware
    const { group_id, invitee } = request.params;

    try {
      await UserGroupMember.create({
        user_id: invitee.id,
        user_group_id: group_id
      });
      return response.status(200).json({ msg: 'Sucessfully joined group' });
    } catch (err) {
      console.log(err);
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
      const token = randomString({ length: 16, type: 'base64' });
      await UserGroup.create({ name, user_id: auth.user.id, token }, trx);
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

      return response.status(200).json({ msg: 'Group successfully deleted.' });
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = GroupController;
