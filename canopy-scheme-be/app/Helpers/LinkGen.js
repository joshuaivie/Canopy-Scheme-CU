const Route = use("Route");
const Encryption = use("Encryption");
const Env = use("Env");
const EventInfo = use("App/Utilities/EventInfo");

class LinkGen {
  static async createGroupInviteLink({ route, groupId, email, token }) {
    let now = new Date();
    now.setHours(
      now.getHours() + (await EventInfo.noOfHoursInviteLinkIsValid())
    );
    let endpoint = Route.url(route, {
      group_id: Encryption.encrypt(groupId),
      token,
      invitee_email: Encryption.encrypt(email)
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    const host = Env.get("FRONT_END_URL", "http://localhost:3000");
    return `${host}${endpoint}`;
  }

  static createEmailVerifyLink({ route, token }) {
    let endpoint = Route.url(route, {
      token
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    const host = Env.get("FRONT_END_URL", "http://localhost:3000");
    return `${host}${endpoint}`;
  }

  static createPasswordLink({ route, email_token }) {
    let endpoint = Route.url(route, {
      email_token
    });
    // remove "/api" so frontend can use it
    endpoint = endpoint.split("/api")[1];
    const host = Env.get("FRONT_END_URL", "http://localhost:3000");
    return `${host}${endpoint}`;
  }
}

module.exports = LinkGen;
