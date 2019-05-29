"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventInfoSchema extends Schema {
  up() {
    this.create("event_infos", table => {
      table.increments();
      table.integer("total_tables").notNullable();
      table.integer("tables_allocated").notNullable();
      table.decimal("table_unit_price", 9, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("event_infos");
  }
}

module.exports = EventInfoSchema;
