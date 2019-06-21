"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddTablesBookedToEventInfosSchema extends Schema {
  up() {
    this.table("event_infos", table => {
      table
        .integer("tables_booked")
        .notNullable()
        .default(0);
    });
  }

  down() {
    this.table("event_infos", table => {
      table.dropColumn("tables_booked");
    });
  }
}

module.exports = AddTablesBookedToEventInfosSchema;
