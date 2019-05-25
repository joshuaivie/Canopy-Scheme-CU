'use strict';

const BaseValidator = use('App/Validators/BaseValidator');

class PayForTable extends BaseValidator {
  get rules() {
    return {
      total_tables: 'required|integer|min:1',
      amount: 'required|number',
      paystack_ref: 'required|string|min:3'
    };
  }
}

module.exports = PayForTable;
