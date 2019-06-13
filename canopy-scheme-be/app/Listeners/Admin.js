"use strict";

const Logger = use("Logger");
const Admin = (exports = module.exports = {});

Admin.updatedOfflineTransaction = async ({ admin, transaction }) => {
  const { firstname, lastname, email } = admin;
  const { reference, status, admin_message } = transaction;
  admin = JSON.stringify({ firstname, lastname, email });
  transaction = JSON.stringify({ reference, status, admin_message });

  Logger.transport("database").info(
    `Admin ${admin}: updated offline transaction as follows: ${transaction}`
  );
  // Todo: Dispatch to Notify user of transaction status change job queue.
};
