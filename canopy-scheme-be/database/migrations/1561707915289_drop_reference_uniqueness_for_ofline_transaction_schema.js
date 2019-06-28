"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DropReferenceUniquenessForOflineTransactionSchema extends Schema {
  up() {
    this.table("offline_transactions", table => {
      table.dropUnique("reference");
    });
  }

  down() {
    this.table("offline_transactions", table => {
      table.unique("reference");
    });
  }
}

module.exports = DropReferenceUniquenessForOflineTransactionSchema;
