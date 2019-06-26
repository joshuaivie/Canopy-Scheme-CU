"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OnlineTransaction extends Model {
  static get hidden() {
    return ["id", "user_id"];
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = OnlineTransaction;
