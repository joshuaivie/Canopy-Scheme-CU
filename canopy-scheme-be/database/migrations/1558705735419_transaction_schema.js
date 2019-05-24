'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TransactionSchema extends Schema {
  up() {
    this.create('transactions', table => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('paystacke_ref', 200).notNullable();
      table.decimal('amount', 9, 4).notNullable();
      table.integer('total_table').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('transactions');
  }
}

module.exports = TransactionSchema;
