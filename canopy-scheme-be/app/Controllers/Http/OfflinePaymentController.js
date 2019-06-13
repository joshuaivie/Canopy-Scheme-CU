"use strict";
const EventInfo = use("App/Utilities/EventInfo");
const OfflineTransaction = use("App/Models/OfflineTransaction");
const ModelNotFoundException = "ModelNotFoundException";
const Event = use("Event");

class OfflinePaymentController {
  async getAll({ request, response }) {
    const { page = 1, limit = 50 } = request.params;

    try {
      return response.ok({
        transactions: await OfflineTransaction.query()
          .with(["user"])
          .orderBy(["status", "updated_at"])
          .forPage(page, limit)
          .fetch()
      });
    } catch (err) {
      return response.internalServerError({ msg: err.msg });
    }
  }

  async update({ request, response, auth }) {
    const { reference } = request.params;
    const { status, admin_message } = request.all();

    try {
      const transaction = await OfflineTransaction.findByOrFail(
        "reference",
        reference
      );
      transaction.merge({ status, admin_message });
      await transaction.save();

      Event.fire("admin::updated::offline-transaction", {
        admin: auth.user,
        transaction
      });
      return response.ok({ msg: "Successfully updated transaction status." });
    } catch (err) {
      if (err.name === ModelNotFoundException)
        return response.notFound({ msg: "Invalid offline transaction." });
      return response.internalServerError({ msg: err.message });
    }
  }

  async purchaseTable({ request, response, auth }) {
    const { reference, amount, photo_url } = request.all();
    const totalTables = Math.floor(amount / (await EventInfo.unitPrice()));
    if (totalTables < 1) {
      return response.badRequest({
        msg:
          "Amount paid is less than price of 1 table unit. Please balance up."
      });
    }

    try {
      await OfflineTransaction.create({
        amount,
        reference,
        photo_url,
        user_id: auth.user.id,
        total_tables: totalTables
      });

      return response.ok({
        msg:
          "Transaction successful. An admininstrator will validate your transaction shortly."
      });
    } catch (err) {
      if (err.code == "ER_DUP_ENTRY")
        return response.badRequest({
          msg: "Transaction reference already exists."
        });
      return response.internalServerError({ msg: err.msg });
    }
  }
}

module.exports = OfflinePaymentController;
