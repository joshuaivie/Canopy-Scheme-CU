"use strict";

const Mail = use("Mail");

class PasswordResetEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "password-reset-email";
  }

  async handle(data) {
    const { user } = data;

    await Mail.send("emails.password-reset", data, message => {
      message
        .to(user.email, `${user.firstname} ${user.lastname}`)
        .from(
          "no-reply@the14thset.covenantuniversity.edu.ng",
          "The 14th Set Canopy Scheme Team"
        )
        .subject("Password Reset");
    });
  }
}

module.exports = PasswordResetEmail;
