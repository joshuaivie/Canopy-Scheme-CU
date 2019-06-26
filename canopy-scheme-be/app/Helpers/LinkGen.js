const Route = use("Route");
const Encryption = use("Encryption");
const Env = use("Env");
const HOST = Env.get("FRONT_END_URL");

class LinkGen {
  static async createGroupInviteLink({ route, groupId, email, token }) {
    let endpoint = Route.url(route, {
      group_id: Encryption.encrypt(groupId),
      token,
      invitee_email: Encryption.encrypt(email)
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    return `${HOST}${endpoint}`;
  }

  static createEmailVerifyLink({ route, token }) {
    let endpoint = Route.url(route, {
      token
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    return `${HOST}${endpoint}`;
  }

  static createPasswordLink({ route, email_token }) {
    let endpoint = Route.url(route, {
      email_token
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    return `${HOST}${endpoint}`;
  }
}

module.exports = LinkGen;
