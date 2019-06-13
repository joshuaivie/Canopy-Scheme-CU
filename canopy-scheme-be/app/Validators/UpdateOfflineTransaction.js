"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class UpdateOfflineTransaction extends BaseValidator {
  get rules() {
    return {
      status: "required|in:accepted,rejected",
      admin_message: "required|string|min:5"
    };
  }

  get messages() {
    return {
      "status.in": "A status can either be `accepted` or `rejected`.",
      "admin_message.required": "Admin message cannot be empty.",
      "admin_message.min": "Admin message must be at least 5 characters long."
    };
  }
}

module.exports = UpdateOfflineTransaction;
