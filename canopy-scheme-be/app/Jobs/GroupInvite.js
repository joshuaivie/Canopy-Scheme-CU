"use strict";

const Mail = use("Mail");

class GroupInvite {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "group-invite-email";
  }

  // This is where the work is done.
  async handle(data) {
    const { inviter, groupName, invitee } = data;

    await Mail.send("emails.group-invite", data, message => {
      message
        .to(invitee.email, `${invitee.firstname} ${invitee.lastname}`)
        .from(
          "no-reply@the14thset.covenantuniversity.edu.ng",
          "The 14th Set Canopy Scheme Team"
        )
        .subject(
          `${inviter.firstname} ${
            inviter.lastname
          } has invited you to a canopy scheme group '${groupName}'`
        );
    });
  }
}

module.exports = GroupInvite;
