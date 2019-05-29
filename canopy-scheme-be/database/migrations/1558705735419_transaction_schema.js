"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TransactionSchema extends Schema {
  up() {
    this.create("transactions", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
      table
        .string("paystack_ref", 200)
        .notNullable()
        .unique();
      table.decimal("amount", 15, 4).notNullable();
      table.integer("total_table").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("transactions");
  }
}

module.exports = TransactionSchema;
