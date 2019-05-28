const Route = use('Route');
const Encryption = use('Encryption');
const Env = use('Env');

class LinkGen {
  static createGroupInviteLink(route, groupId, token) {
    const endpoint = Route.url(route, { group_id: Encryption.encrypt(groupId), token });
    const host = Env.get('APP_URL', '127.0.0.1');
    return `${host}${endpoint}`;
  }
}

module.exports = LinkGen;