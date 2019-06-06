const Route = use("Route");
const Encryption = use("Encryption");
const Env = use("Env");

class LinkGen {
  static createGroupInviteLink({ route, groupId, email, token }) {
    const endpoint = Route.url(route, {
      group_id: Encryption.encrypt(groupId),
      token,
      invitee_email: Encryption.encrypt(email)
    });
    const host = Env.get("FRONT_END_URL", "localhost:3000");
    return `${host}${endpoint}`;
  }

  static createEmailVerifyLink({ route, token }) {
    const endpoint = Route.url(route, {
      token
    });
    const host = Env.get("FRONT_END_URL", "localhost:3000");
    return `${host}${endpoint}`;
  }

  static createPasswordLink({ route, email_token }) {
    const endpoint = Route.url(route, {
      email_token
    });
    const host = Env.get("FRONT_END_URL", "localhost:3000");
    return `${host}${endpoint}`;
  }
}

module.exports = LinkGen;
