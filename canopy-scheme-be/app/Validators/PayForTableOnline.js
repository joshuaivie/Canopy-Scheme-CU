"use strict";

const BaseValidator = use("App/Validators/BaseValidator");

class PayForTableOnline extends BaseValidator {
  get rules() {
    return {
      total_table: "required|integer|min:1", // add the max number of tables here too
      amount: "required|number",
      paystack_ref: "required|string|min:3" // get the actual length of paystack_ref and update min
    };
  }
}

module.exports = PayForTableOnline;
