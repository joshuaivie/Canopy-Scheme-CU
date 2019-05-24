'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ReservationSchema extends Schema {
  up() {
    this.create('reservations', table => {
      table.increments();
      table.string('tent_name', 200).notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('table_no', 200).notNullable();
      table.string('name', 200).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('reservations');
  }
}

module.exports = ReservationSchema;
