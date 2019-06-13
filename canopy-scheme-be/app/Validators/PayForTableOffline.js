"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class PayForTableOffline extends BaseValidator {
  get rules() {
    return {
      reference: "required|string|min:3",
      amount: "required|number",
      photo_url: "required|url"
    };
  }
}

module.exports = PayForTableOffline;
