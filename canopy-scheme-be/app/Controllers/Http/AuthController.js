"use strict";

const Encryption = use("Encryption");
const User = use("App/Models/User");
const Token = use("App/Models/Token");
const Kue = use("Kue");
const SignupEmailJob = use("App/Jobs/SignupEmail");
const EmailVerification = use("App/Models/EmailVerification");
const Link = use("App/Helpers/LinkGen");
const randomString = require("crypto-random-string");

class UserController {
  /**
   * Registers a new user.
   */
  async register({ request, response, auth }) {
    const details = request.only([
      "email",
      "matric_no",
      "password",
      "firstname",
      "lastname",
      "telephone_no"
    ]);

    try {
      const user = await User.create({ ...details });
      const { token } = await EmailVerification.create({
        email: user.email,
        token: randomString({ length: 32, type: "url-safe" })
      });
      const email_verify_link = Link.createEmailVerifyLink({
        route: "email.verify",
        token
      });
      Kue.dispatch(
        SignupEmailJob.key,
        { user, email_verify_link },
        {
          priority: "normal",
          attempts: 3,
          remove: true,
          jobFn: () => {}
        }
      );

      const data = await auth
        .withRefreshToken()
        .attempt(details.email, details.password);
      return response.ok({ msg: "Registration successfull.", ...data, user });
    } catch (err) {
      return response.badRequest({ msg: err.message });
    }
  }

  /**
   * Login a given user.
   */
  async login({ request, response, auth }) {
    const { email, password } = request.only(["email", "password"]);

    try {
      const data = await auth.withRefreshToken().attempt(email, password);
      const user = await User.findBy("email", email);
      return response.ok({ msg: "Login successfull.", ...data, user });
    } catch (err) {
      console.log(err);
      return response.badRequest({ msg: "Invalid email or password." });
    }
  }

  /**
   * Signout a user.
   */
  async signout({ request, response }) {
    const { refresh_token } = request.only(["refresh_token"]);

    try {
      const decrypted = Encryption.decrypt(refresh_token);
      const refreshToken = await Token.findBy("token", decrypted);
      if (!refreshToken)
        return response.unauthorized({
          msg: "Sorry, you are not currently logged in."
        });

      await refreshToken.delete();
      return response.ok({ msg: "Logout successful." });
    } catch (err) {
      return response.badRequest({ msg: err.message });
    }
  }

  /**
   * Refresh a users token.
   */
  async refreshToken({ request, auth }) {
    const { refresh_token } = request.only(["refresh_token"]);

    try {
      return await auth
        .newRefreshToken()
        .generateForRefreshToken(refresh_token);
    } catch (err) {
      return response.unauthorized({ msg: "Invalid refresh token." });
    }
  }
}

module.exports = UserController;
