"use strict";

const Mail = use("Mail");

class OfflinePaymentUpdate {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "offline-payment-update";
  }

  async handle(data) {
    const { status, reference, user } = data;
    const payment_accepted = status === "accepted";
    data["payment_accepted"] = payment_accepted;

    await Mail.send("emails.offline-payment-update", data, message => {
      message
        .to(user.email, `${user.firstname} ${user.lastname}`)
        .from(
          "no-reply@the14thset.covenantuniversity.edu.ng",
          "The 14th Set Canopy Scheme Team"
        )
        .subject(
          `Your payment evidence with reference ${reference} for canopy scheme has been ${status}`
        );
    });
  }
}

module.exports = OfflinePaymentUpdate;
