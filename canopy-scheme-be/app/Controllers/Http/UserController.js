"use strict";

const Database = use("Database");
const User = use("App/Models/User");
const UserGroupMember = use("App/Models/UserGroupMember");
const EmailVerification = use("App/Models/EmailVerification");
const randomString = require("crypto-random-string");
const JobQueue = use("App/Helpers/JobQueue");
const SignupEmailJob = use("App/Jobs/SignupEmail");
const Link = use("App/Helpers/LinkGen");
const Hash = use("Hash");

class UserController {
  /**
   * Get profile information about a given authenticated user.
   */
  async profile({ response, auth }) {
    try {
      const { user } = auth;
      user["paid_for_table"] = await user.hasVerifiedPayment();
      user["is_admin"] = false;
      return response.ok({ profile: user });
    } catch (err) {
      console.log(err);
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Get all the payment transactions made by a given authenticated user.
   */
  async transactions({ response, auth }) {
    try {
      return response.ok({
        transactions: {
          online: await auth.user.onlineTransactions().fetch(),
          offline: await auth.user.offlineTransactions().fetch()
        }
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
      let userGroup =
        auth.user.is_group_owner == true
          ? auth.user.group()
          : (await auth.user.group().first()).group();
      const { basicMembersInfo: members, ...group } = (await userGroup
        .with("basicMembersInfo")
        .with("owner", builder =>
          builder.setVisible(["matric_no", "email", "firstname", "lastname"])
        )
        .setVisible(["name", "created_at"])
        .fetch()).toJSON();

      return response.ok({ group: { ...group, members } });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Remove an authenticated user from being a member of group
   * they previously belong to.
   */
  async leaveGroup({ response, auth }) {
    try {
      if (auth.user.is_group_owner == true) {
        return response.forbidden({
          msg: "Group creators can only delete groups."
        });
      }
      await auth.user.group().delete();
      return response.ok({ msg: "Successfully left group." });
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
   * Remove a group member from an authenticated user's group.
   */
  async removeGroupMember({ request, response, auth }) {
    const { matric_no } = request.params;

    try {
      const user = await User.findBy("matric_no", matric_no);
      if (!user) return response.badRequest({ msg: "User not found" });

      const { id } = await auth.user.group().first();
      await UserGroupMember.query()
        .where("user_id", user.id)
        .where("user_group_id", id)
        .delete();

      return response.ok({
        msg: `${user.firstname} has been removed from your group.`
      });
    } catch (err) {
      return response.internalServerError({ msg: err.message });
    }
  }

  /**
   * Verifies user's email address.
   */
  async verifyEmail({ params, response }) {
    const { token } = params;

    try {
      const emailVerification = await EmailVerification.query()
        .where("token", token)
        .first();

      if (!emailVerification) {
        return response.badRequest({
          msg: "Email verification link invalid."
        });
      }

      const user = await User.findBy("email", emailVerification.email);
      user.email_verified = true;
      await user.save();

      await EmailVerification.query()
        .where("email", user.email)
        .delete();

      return response.ok({ msg: "Your email has been successfully verified." });
    } catch (err) {
      return response.badRequest({
        msg: "Error occurred."
      });
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
        msg: "Old password is wrong."
      });
    }

    if (data["new_password"] != data["new_password_confirm"]) {
      return response.badRequest({ msg: "New passwords don't match" });
    }
    user.password = data["new_password"];
    await user.save();
    return response.ok({ msg: "Password updated." });
  }

  /**
   * Resend email verification link.
   */
  async resendEmailVerificationLink({ response, auth }) {
    const user = auth.user;
    if (user.email_verified)
      return response.badRequest({ msg: "Your email is already verified" });

    try {
      let emailVerification = await EmailVerification.query()
        .where("email", user.email)
        .first();
      if (!emailVerification) {
        emailVerification = await EmailVerification.create({
          email: user.email,
          token: randomString({ length: 32, type: "url-safe" })
        });
      }
      const email_verify_link = Link.createEmailVerifyLink({
        route: "email.verify",
        token: emailVerification.token
      });

      JobQueue.queueJob({
        jobKey: SignupEmailJob.key,
        data: { user, email_verify_link },
        options: { attempts: 3 }
      });
      return response.ok({ msg: "Email verification link sent successfully." });
    } catch (err) {
      return response.badRequest({
        msg: "Error sending email verification link, please try again later"
      });
    }
  }
}

module.exports = UserController;
