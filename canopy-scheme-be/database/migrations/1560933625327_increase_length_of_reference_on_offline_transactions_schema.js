"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class IncreaseLengthOfReferenceOnOfflineTransactionsSchema extends Schema {
  up() {
    this.table("offline_transactions", table => {
      table.dropUnique("reference");
      table
        .string("reference", 100)
        .notNullable()
        .unique()
        .alter();
    });
  }

  down() {
    this.table("offline_transactions", table => {
      table.dropUnique("reference");
      table
        .string("reference", 20)
        .notNullable()
        .unique()
        .alter();
    });
  }
}

module.exports = IncreaseLengthOfReferenceOnOfflineTransactionsSchema;
