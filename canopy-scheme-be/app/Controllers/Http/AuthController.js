"use strict";

const Encryption = use("Encryption");
const User = use("App/Models/User");
const Admin = use("App/Models/Admin");
const Token = use("App/Models/Token");
const PasswordReset = use("App/Models/PasswordReset");
const randomString = require("crypto-random-string");
const Kue = use("Kue");
const SignupEmailJob = use("App/Jobs/SignupEmail");
const EmailVerification = use("App/Models/EmailVerification");
const Link = use("App/Helpers/LinkGen");
const PasswordResetJob = use("App/Jobs/PasswordResetEmail");
const LOGIN_AUTH_SERVICES = {
  admin: Admin,
  user: User
};

const resolveAuthenticator = (authenticator, supportedServices = {}) => {
  if (authenticator.toLowerCase() in supportedServices != true) {
    return { error: true };
  }
  return {
    authenticator: authenticator.toLowerCase(),
    model: supportedServices[authenticator]
  };
};

class AuthController {
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
      return response.ok({
        msg:
          "Registration successful. Email verification link has been sent to your email.",
        ...data,
        user
      });
    } catch (err) {
      return response.badRequest({ msg: err.message });
    }
  }

  /**
   * Login a given user.
   */
  async login({ request, response, auth }) {
    const { model: Model, authenticator, error } = resolveAuthenticator(
      request.params.authenticator,
      LOGIN_AUTH_SERVICES
    );
    if (error == true) return response.notFound();
    const { email, password } = request.only(["email", "password"]);

    try {
      const data = await auth
        .authenticator(authenticator)
        .withRefreshToken()
        .attempt(email, password);
      const user = await Model.findBy("email", email);
      return response.ok({ msg: "Login successful.", ...data, user });
    } catch (err) {
      return response.badRequest({ msg: "Invalid email or password." });
    }
  }

  /**
   * Logout a user.
   */
  async logout({ request, response }) {
    const { refresh_token } = request.only(["refresh_token"]);

    try {
      const decrypted = Encryption.decrypt(refresh_token);
      await Token.query()
        .where("token", decrypted)
        .delete();

      return response.ok({ msg: "Logout successful." });
    } catch (err) {
      return response.badRequest({ msg: err.message });
    }
  }

  /**
   * Refresh a users token.
   */
  async refreshToken({ request, response, auth }) {
    const { refresh_token } = request.only(["refresh_token"]);
    const { authenticator, error } = resolveAuthenticator(
      request.params.authenticator,
      ["user", "admin"]
    );
    if (error === true) return response.notFound();

    try {
      return await auth
        .authenticator(authenticator)
        .newRefreshToken()
        .generateForRefreshToken(refresh_token);
    } catch (err) {
      return response.unauthorized({ msg: "Invalid refresh token." });
    }
  }

  async sendResetPasswordLink({ request, response }) {
    const { email } = request.only(["email"]);
    try {
      const user = await User.findBy("email", email);
      await PasswordReset.query()
        .where("email", user.email)
        .delete();
      const { email_token } = await PasswordReset.create({
        email: user.email,
        email_token: randomString({ length: 32, type: "url-safe" })
      });
      const password_reset_link = Link.createPasswordLink({
        route: "password.reset-token",
        email_token
      });
      Kue.dispatch(
        PasswordResetJob.key,
        { user, password_reset_link },
        {
          priority: "normal",
          attempts: 3,
          remove: true,
          jobFn: () => {}
        }
      );

      return response.ok({
        msg: "A password reset link has been sent to your email address."
      });
    } catch (err) {
      return response.badRequest({
        msg: "This email is not registered on this platform"
      });
    }
  }

  async resetPassword({ request, params, response }) {
    const { email_token } = params;
    const { password, password_confirm } = request.only([
      "password",
      "password_confirm"
    ]);

    try {
      const passwordReset = await PasswordReset.query()
        .where("email_token", email_token)
        .first();

      if (!passwordReset) {
        return response.badRequest({
          msg:
            "Password reset link invalid, please try the reset password process again."
        });
      }

      if (password != password_confirm) {
        return response.badRequest({
          msg: "You new passwords don't match."
        });
      }

      const user = await User.findBy("email", passwordReset.email);
      user.password = password;
      await user.save();

      await PasswordReset.query()
        .where("email", user.email)
        .delete();

      return response.ok({ msg: "Password successfully reset." });
    } catch (err) {
      return response.badRequest({
        msg:
          "Error resetting password, please try the reset password process again."
      });
    }
  }
}

module.exports = AuthController;
