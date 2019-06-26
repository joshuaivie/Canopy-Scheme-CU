"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsOfflineTransactionOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      const { reference } = request.params;
      const transaction = await auth.user
        .offlineTransactions()
        .where("reference", reference)
        .first();
      if (transaction == null)
        return response.badRequest({
          msg: "The specified offline transaction doesn't exit."
        });
    } catch (err) {
      return response.internalServerError({ msg: err.msg });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = IsOfflineTransactionOwner;
