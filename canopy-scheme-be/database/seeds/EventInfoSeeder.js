"use strict";

/*
|--------------------------------------------------------------------------
| EventInfoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const EventInfo = use("App/Models/EventInfo");

class EventInfoSeeder {
  async run() {
    await EventInfo.create({
      total_tables: 960,
      tables_allocated: 0,
      table_unit_price: 10000,
      maximum_group_members: 5
    });
  }
}

module.exports = EventInfoSeeder;
