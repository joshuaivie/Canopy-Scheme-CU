"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReservationSchema extends Schema {
  up() {
    this.create("reservations", table => {
      table.increments();
      table.string("tent_name", 5).notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("table_no", 10).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("reservations");
  }
}

module.exports = ReservationSchema;
