"use strict";

const Database = use("Database");
const UserGroup = use("App/Models/UserGroup");
const GroupInvite = use("App/Utilities/GroupInvite");
const randomString = require("crypto-random-string");
const UserGroupMember = use("App/Models/UserGroupMember");

class GroupController {
  async invite({ request, response, auth }) {
    const { users } = request.only(["users"]);

    try {
      const group = (await auth.user.group().first()).toJSON();
      const { failed } = await GroupInvite.inviteUsers(auth.user, users, group);
      if (failed.length > 0) {
        return response.ok({
          failed,
          msg: "Invitation wasn't sent to one or more email addresses."
        });
      }

      return response.ok({ msg: "Invitation(s) successfully sent." });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Allow a user to join a user group via a unique URL.
   */
  async join({ request, response }) {
    // `invitee` param gets added in the InviteeNotInUserGroup middleware
    const { group_id, invitee } = request.params;

    try {
      await UserGroupMember.create({
        user_id: invitee.id,
        user_group_id: group_id
      });
      return response.ok({ msg: "Sucessfully joined group" });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Create a user group if only the user hasn't aleady created
   * a group or belongs to any group.
   */
  async create({ request, response, auth }) {
    const { name } = request.only(["name"]);

    try {
      const trx = await Database.beginTransaction();
      const token = randomString({ length: 16, type: "base64" });
      await UserGroup.create({ name, user_id: auth.user.id, token }, trx);
      auth.user.is_group_owner = true;
      await auth.user.save(trx);
      trx.commit();

      return response.ok({ msg: "Group has been created." });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }
}

module.exports = GroupController;
