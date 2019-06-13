"use strict";

const Mail = use("Mail");

class PaymentStatusUpdate {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "payment-status-update";
  }

  async handle(data) {
    const { payment_accepted, user } = data;
    const status = payment_accepted ? "accepted" : "rejected";
    data["payment_status"] = payment_status;

    await Mail.send("emails.payment-status-update", data, message => {
      message
        .to(user.email, `${user.firstname} ${user.lastname}`)
        .from(
          "no-reply@the14thset.covenantuniversity.edu.ng",
          "The 14th Set Canopy Scheme Team"
        )
        .subject(
          `Your payment evidence for canopy scheme has been ${payment_status}`
        );
    });
  }
}

module.exports = PaymentStatusUpdate;
