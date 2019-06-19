"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class PayForTableOffline extends BaseValidator {
  get rules() {
    return {
      evidence:
        "required|file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image",
      reference: "required|string|min:3|max:100",
      amount: "required|number"
    };
  }

  get messages() {
    return {
      "evidence.required": "An evidence image is required."
    };
  }
}

module.exports = PayForTableOffline;
