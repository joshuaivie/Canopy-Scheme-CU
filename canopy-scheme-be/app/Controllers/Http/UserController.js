"use strict";

const Database = use("Database");
const Hash = use("Hash");

class UserController {
  /**
   * Get profile information about a given authenticated user.
   */
  async profile({ response, auth }) {
    try {
      return response.ok({ profile: await auth.user });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Get all the payment transactions made by a given authenticated user.
   */
  async transactions({ response, auth }) {
    try {
      return response.ok({
        transactions: await auth.user.transactions().fetch()
      });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Get all the table reservation made by a given authenticated user.
   */
  async reservations({ response, auth }) {
    try {
      return response.ok({
        reservations: await auth.user.reservations().fetch()
      });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Get group information about authenticated user.
   */
  async getGroup({ response, auth }) {
    try {
      if (auth.user.is_group_owner == true) {
        const group = await auth.user
          .group()
          .with("members")
          .fetch();
        return response.ok({ group: group.toJSON() });
      }

      const {
        token,
        ...group
      } = (await (await auth.user.group().first()).group().fetch()).toJSON();
      return response.ok({ group });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Delete a user group created by an authenticated user.
   */
  async deleteGroup({ response, auth }) {
    const trx = await Database.beginTransaction();

    try {
      await auth.user.group().delete(trx);
      auth.user.is_group_owner = false;
      await auth.user.save(trx);
      trx.commit();

      return response.ok({ msg: "Group successfully deleted." });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Change password.
   */

  async changePassword({ request, response, auth }) {
    const user = auth.user;
    const data = request.only([
      "old_password",
      "new_password",
      "new_password_confirm"
    ]);

    const verifyPassword = await Hash.verify(
      data["old_password"],
      user.password
    );

    if (!verifyPassword) {
      return response.badRequest({
        msg: "Current is password wrong."
      });
    }

    if (data["new_password"] != data["new_password_confirm"]) {
      return response.badRequest({ msg: "New passwords don't match" });
    }
    user.password = data["new_password"];
    await user.save();
    return response.ok({ msg: "Password updated." });
  }
}

module.exports = UserController;
