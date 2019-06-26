"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RenameColumnOnOfflineTransactionSchema extends Schema {
  up() {
    this.table("offline_transactions", table => {
      table.renameColumn("total_tables", "total_table");
    });
  }

  down() {
    this.table("offline_transactions", table => {
      table.renameColumn("total_table", "total_tables");
    });
  }
}

module.exports = RenameColumnOnOfflineTransactionSchema;
