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
      const group = await auth.user
        .group()
        .with("basicMembersInfo")
        .first();
      const totalMembers = (await group
        .members()
        .where("joined", true)
        .count("* as total")
        .first()).total;
      if (totalMembers + users.length > group.maximum_group_members)
        return response.badRequest({
          msg: "You cannot invite anymore. You have maxed out your slots"
        });

      const { failed } = await GroupInvite.inviteUsers(
        auth.user,
        users,
        group.toJSON()
      );
      if (failed.length > 0) {
        return response.badRequest({
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
   * Allow a user to join a user group via a unique URL
   */
  async join({ request, response }) {
    // `invitee` param gets added in the InviteeNotInUserGroup middleware
    const { group_id, invitee } = request.params;

    try {
      const hasVerifiedPayment = await invitee.hasVerifiedPayment();
      if (!hasVerifiedPayment)
        return response.badRequest({
          msg:
            "You have not paid for a table yet. You can only join when you have paid"
        });
      const member = await UserGroupMember.query()
        .where("user_group_id", group_id)
        .where("user_id", invitee.id)
        .first();
      if (member === null) {
        return response.badRequest({
          msg: "You were not invited to this group."
        });
      }
      member.joined = true;
      member.save();

      return response.ok({ msg: "Successfully joined group." });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Create a user group if only the user hasn't already created
   * a group or belongs to any group.
   */
  async create({ request, response, auth }) {
    const { name } = request.only(["name"]);

    try {
      const trx = await Database.beginTransaction();
      const token = randomString({ length: 16, type: "url-safe" });
      await UserGroup.create({ name, user_id: auth.user.id, token }, trx);
      auth.user.is_group_owner = true;
      await auth.user.save(trx);
      trx.commit();

      return response.ok({ msg: "Group created." });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }
}

module.exports = GroupController;
