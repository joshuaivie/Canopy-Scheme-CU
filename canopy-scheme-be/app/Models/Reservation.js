"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Reservation extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to to join tent name and table number before saving
     * it to the database.
     */
    this.addHook("beforeSave", async reservationInstance => {
      const { tent_name, table_no } = reservationInstance;
      reservationInstance.name = tent_name + table_no;
    });
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Reservation;
