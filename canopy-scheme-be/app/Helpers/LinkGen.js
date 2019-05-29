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
        const host = Env.get("APP_URL", "127.0.0.1");
        return `${host}${endpoint}`;
    }
}

module.exports = LinkGen;
