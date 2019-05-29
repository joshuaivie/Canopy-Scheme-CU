"use strict";

const Paystack = use("Paystack");

class PaystackService {
  static async verifyTransactionAmount(reference, amountInKobo) {
    try {
      const { data } = await Paystack.transaction.verify({ reference });
      if (data.status !== "success") throw new Error(data.gateway_response);
      if (data.amount !== amountInKobo) {
        const reason =
          "Amount paid is not equal to the expected price of the item(s) purchased";
        await PaystackService.refundPayment({
          reference,
          reason,
          amount: data.amount
        });
        throw new Error(reason);
      }

      return data;
    } catch (err) {
      if (err.name === "StatusCodeError") throw new Error(err.error.message);
      throw err;
    }
  }

  static async refundPayment({ reference, amount, reason }) {
    try {
      await Paystack.refund.create({
        transaction: reference,
        amount,
        customer_note: reason
      });
    } catch (err) {
      // push to Redis queue to continously attempt a refund until successfull.
    }
  }
}

module.exports = PaystackService;
