"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class RequestToken extends BaseValidator {
  get rules() {
    return {
      refresh_token: "required"
    };
  }
}

module.exports = RequestToken;
