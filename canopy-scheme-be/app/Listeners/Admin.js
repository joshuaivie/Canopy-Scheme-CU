"use strict";

const Logger = use("Logger");
const OfflinePaymentUpdateJob = use("App/Jobs/OfflinePaymentUpdate");
const JobQueue = use("App/Helpers/JobQueue");
const User = use("App/Models/User");
const Env = use("Env");
const Admin = (exports = module.exports = {});

Admin.updatedOfflineTransaction = async ({ admin, transaction }) => {
  const { firstname, lastname, email } = admin;
  const { reference, status, admin_message } = transaction;
  admin = JSON.stringify({ firstname, lastname, email });
  const user = await transaction.user().fetch();
  transaction = JSON.stringify({ reference, status, admin_message });
  Logger.transport("database").info(
    `Admin ${admin}: updated offline transaction as follows: ${transaction}`
  );
  const host = Env.get("FRONT_END_URL", "http://localhost:3000");
  const dashboard_url = `${host}/app`;
  JobQueue.queueJob({
    jobKey: OfflinePaymentUpdateJob.key,
    data: { user, reference, status, admin_message, dashboard_url },
    options: { attempts: 2 }
  });
};
