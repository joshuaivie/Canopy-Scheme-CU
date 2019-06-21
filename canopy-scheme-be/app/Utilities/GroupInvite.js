const { sanitize } = use("Validator");
const User = use("App/Models/User");
const UserGroupMember = use("App/Models/UserGroupMember");
const Link = use("App/Helpers/LinkGen");
const GroupInviteJob = use("App/Jobs/GroupInvite");
const JobQueue = use("App/Helpers/JobQueue");

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
        if (inviter.email == email)
          throw new Error(
            "A group owner cannot be invited to a group he/she created."
          );
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
        if (userInAnyGroup || invitee.is_group_owner)
          throw new Error("User already in a group");

        // check if invitee has paid for at least a table.
        const hasVerifiedPayment = await invitee.hasVerifiedPayment();
        if (!hasVerifiedPayment)
          throw new Error(
            `${
              invitee.firstname
            } has not paid for a table yet. You can only invite when he/she has paid`
          );

        await UserGroupMember.create({
          user_id: invitee.id,
          user_group_id: group.id
        });
        const data = {
          route: "group.join",
          groupId: group.id,
          email,
          token: group.token
        };
        const inviteUrl = await Link.createGroupInviteLink(data);

        // Dispatch mailing of invite link to invitee email.
        JobQueue.queueJob({
          jobKey: GroupInviteJob.key,
          data: {
            inviter,
            invitee,
            groupName: group.name,
            inviteUrl
          },
          options: { attempts: 2 }
        });
      } catch (err) {
        failed.push({ user, msg: err.message ? err.message : err });
      }
    }

    return { failed };
  }
}

module.exports = GroupInvite;
