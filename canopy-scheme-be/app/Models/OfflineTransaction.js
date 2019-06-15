"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OfflineTransaction extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async transaction => {
      if (transaction.status === "accepted") {
        const { total_table } = transaction;
        transaction.admin_message = `You paid for ${total_table} table${
          total_table > 1 ? "s" : ""
        }.`;
      }
    });
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = OfflineTransaction;
