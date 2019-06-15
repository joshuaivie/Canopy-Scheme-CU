"use strict";
const EventInfo = use("App/Utilities/EventInfo");
const OfflineTransaction = use("App/Models/OfflineTransaction");
const ModelNotFoundException = "ModelNotFoundException";
const Event = use("Event");
const Cloudinary = use("Cloudinary");

class OfflinePaymentController {
  async getAll({ request, response }) {
    const { page = 1, limit = 50 } = request.params;

    try {
      return response.ok({
        paginated_data: await OfflineTransaction.query()
          .with(["user"])
          .orderBy(["status", "updated_at"])
          .paginate(page, limit)
      });
    } catch (err) {
      console.log(err);
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
      if (transaction != "pending")
        return response.badRequest({
          msg:
            "This transaction has already been modified. You cannot modify anymore"
        });
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
    const { reference, amount } = request.all();
    let evidence = request.file("evidence", { types: ["image"], size: "5mb" });
    try {
      let { secure_url } = await Cloudinary.uploader.upload(evidence.tmpPath, {
        tags: "table_payment_evidence"
      });
      const totalTable = Math.floor(amount / (await EventInfo.unitPrice()));
      if (totalTable < 1) {
        return response.badRequest({
          msg:
            "Amount paid is less than price of 1 table unit. Please balance up."
        });
      }
      await OfflineTransaction.create({
        amount,
        reference,
        photo_url: secure_url,
        user_id: auth.user.id,
        total_table: totalTable
      });

      return response.ok({
        msg:
          "Transaction successful. An admininstrator will validate your transaction shortly.",
        photo_url: secure_url
      });
    } catch (err) {
      console.log(err);
      if (err.code == "ER_DUP_ENTRY")
        return response.badRequest({
          msg: "Transaction reference already exists."
        });
      return response.internalServerError({ msg: err.msg });
    }
  }
}

module.exports = OfflinePaymentController;
