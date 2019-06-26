"use strict";

const Paystack = use("App/Services/PaystackService");
const OnlineTransaction = use("App/Models/OnlineTransaction");
const EventInfo = use("App/Utilities/EventInfo");
const { nairaToKobo, koboToNaira } = use("App/Helpers/Money");

class OnlinePaymentController {
  async getAll({ request, response }) {
    const { page = 1, limit = 50 } = request.params;

    return response.ok({
      transactions: await OnlineTransaction.query()
        .with(["user"])
        .orderBy(["updated_at"])
        .paginate(page, limit)
    });
  }

  /**
   * Pay for any amount of table in the event.
   * Payment verification must first be performed to ensure a legit
   * transaction was made, else make a refund for the user.
   *
   * Todo: Currently, a balance refund (if change remains after purchase) cannot be refundd.
   */
  async purchaseTable({ request, response, auth }) {
    let { paystack_ref, amount } = request.only(["paystack_ref", "amount"]);

    try {
      const transaction = await Paystack.verifyTransactionAmount(
        paystack_ref,
        nairaToKobo(amount)
      );
      const totalTable = Math.floor(
        transaction.amount / nairaToKobo(await EventInfo.unitPrice())
      );

      if (totalTable < 1) {
        const reason = "Amount paid is less than price of 1 table unit";
        await PaystackService.refundPayment({
          reference: paystack_ref,
          amount: transaction.amount,
          reason
        });
        return response.ok({ msg: reason });
      }

      await OnlineTransaction.create({
        user_id: auth.user.id,
        paystack_ref,
        amount: koboToNaira(transaction.amount),
        total_table: totalTable
      });
      return response.ok({ msg: "Online transaction successful" });
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY")
        return response.conflict({ msg: "Invalid Payment." });
      return response.internalServerError({ msg: err.message });
    }
  }
}

module.exports = OnlinePaymentController;
