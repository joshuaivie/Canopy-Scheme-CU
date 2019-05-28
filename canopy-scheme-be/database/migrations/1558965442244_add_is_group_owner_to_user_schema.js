'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddIsGroupOwnerToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.boolean('is_group_owner').default(false).notNullable();
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('is_group_owner');
    });
  }
}

module.exports = AddIsGroupOwnerToUserSchema;
