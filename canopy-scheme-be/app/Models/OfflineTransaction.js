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
        const { total_tables } = transaction;
        transaction.admin_message = `You paid for ${total_tables} table${
          total_tables > 1 ? "s" : ""
        }.`;
      }
    });
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = OfflineTransaction;
