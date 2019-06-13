const Kue = use("Kue");
const { sanitize } = use("Validator");
const User = use("App/Models/User");
const UserGroupMember = use("App/Models/UserGroupMember");
const Link = use("App/Helpers/LinkGen");
const GroupInviteJob = use("App/Jobs/GroupInvite");

class GroupInvite {
  static async inviteUsers(inviter, users, group) {
    let failed = [];
    let unique = new Set();

    for (const user of users) {
      try {
        if (user.email == null || user.matric_no == null)
          throw new Error("Invalid user format.");
        let { email, matric_no } = sanitize(user, {
          email: "normalize_email",
          matric_no: "lowercase"
        });

        if (inviter.email == email) {
          throw new Error(
            "A group owner cannot be invited to a group he/she created."
          );
        }

        if (unique.has(email)) throw new Error("Duplicate user");
        else unique.add(email);

        const invitee = await User.query()
          .where("matric_no", matric_no)
          .where("email", email)
          .first();
        if (invitee === null)
          throw new Error("User with this email/matric number doesn't exist.");

        // if user already in a group, don't invite
        const userInAnyGroup = await UserGroupMember.findBy(
          "user_id",
          invitee.id
        );
        if (userInAnyGroup) throw new Error("User already in a group");

        // check if invitee has paid for at least a table.
        const transactions = await invitee.transactions().fetch();
        if (
          transactions.offline.rows.length < 1 &&
          transactions.online.rows.length < 1
        )
          throw new Error(
            `${
              invitee.firstname
            } has not paid for a table yet. You can only invite when he/she has paid`
          );

        const data = {
          route: "group.join",
          groupId: group.id,
          email,
          token: group.token
        };
        const inviteUrl = await Link.createGroupInviteLink(data);

        // Dispatch mailing of invite link to invitee email.
        GroupInvite._dispatchMailing({
          payload: {
            inviter,
            invitee,
            groupName: group.name,
            inviteUrl
          }
        });
      } catch (err) {
        failed.push({ user, msg: err.message ? err.message : err });
      }
    }

    return { failed };
  }

  static _dispatchMailing({ payload }) {
    const config = {
      priority: "normal",
      attempts: 3,
      remove: true,
      jobFn: () => {}
    };
    Kue.dispatch(GroupInviteJob.key, payload, config);
  }
}

module.exports = GroupInvite;
