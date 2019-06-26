"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class UpdateOfflineTransaction extends BaseValidator {
  get rules() {
    return {
      status: "required|in:accepted,rejected",
      admin_message: "required_when:status,rejected|string|min:10"
    };
  }

  get messages() {
    return {
      "status.in": "A status can either be `accepted` or `rejected`.",
      "admin_message.required_when":
        "Admin message cannot be empty if you rejected the transaction",
      "admin_message.min": "Admin message must be at least 10 characters long."
    };
  }
}

module.exports = UpdateOfflineTransaction;
