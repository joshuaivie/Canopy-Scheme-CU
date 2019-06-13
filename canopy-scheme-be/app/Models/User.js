"use strict";

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class User extends Model {
  static get hidden() {
    return ["id", "password"];
  }

  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  async transactions() {
    return {
      offline: await this.offlineTransactions(),
      online: await this.onlineTransactions()
    };
  }

  onlineTransactions() {
    return this.hasMany("App/Models/OnlineTransaction");
  }

  offlineTransactions() {
    return this.hasMany("App/Models/OfflineTransaction");
  }

  async hasVerifiedPayment() {
    const transaction = await this.offlineTransactions()
      .where("status", "accepted")
      .first();
    return transaction !== null;
  }

  async hasVerifiedPayment() {
    const offlineTransaction = await this.onlineTransactions()
      .where("status", "accepted")
      .first();
    const onlineTransaction = await this.offlineTransactions()
      .where("status", "accepted")
      .first();
    return offlineTransaction !== null || onlineTransaction !== null;
  }

  reservations() {
    return this.hasMany("App/Models/Reservation");
  }

  group() {
    if (this.is_group_owner == true) {
      return this.hasOne("App/Models/UserGroup");
    }
    return this.hasOne("App/Models/UserGroupMember");
  }
}

module.exports = User;
