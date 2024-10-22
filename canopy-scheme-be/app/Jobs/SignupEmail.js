"use strict";
const Mail = use("Mail");

class SignupEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "signup-email";
  }

  async handle(data) {
    const { user } = data;

    await Mail.send("emails.signup", data, message => {
      message
        .to(user.email, `${user.firstname} ${user.lastname}`)
        .from(
          "no-reply@the14thset.covenantuniversity.edu.ng",
          "The 14th Set Canopy Scheme Team"
        )
        .subject("Welcome to the Canopy Scheme");
    });
  }
}

module.exports = SignupEmail;
