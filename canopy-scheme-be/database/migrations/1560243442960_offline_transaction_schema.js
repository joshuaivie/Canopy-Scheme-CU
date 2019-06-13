"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OfflineTransactionSchema extends Schema {
  up() {
    this.rename("transactions", "online_transactions");

    this.create("offline_transactions", table => {
      table.increments();
      table
        .string("reference", 20)
        .notNullable()
        .unique();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
      table.decimal("amount", 15, 4).notNullable();
      table.string("photo_url", 500).notNullable();
      table.integer("total_tables").notNullable();
      table
        .enu("status", ["pending", "accepted", "rejected"])
        .notNullable()
        .default("pending");
      table.string("admin_message");
      table.timestamps();
    });
  }

  down() {
    this.rename("online_transactions", "transactions");
    this.drop("offline_transactions");
  }
}

module.exports = OfflineTransactionSchema;
