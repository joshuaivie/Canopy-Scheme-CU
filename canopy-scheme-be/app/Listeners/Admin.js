"use strict";

const Logger = use("Logger");
const OfflinePaymentUpdateJob = use("App/Jobs/OfflinePaymentUpdate");
const JobQueue = use("App/Helpers/JobQueue");
const EventInfo = use("App/Models/EventInfo");
const Database = use("Database");
const Env = use("Env");
const Admin = (exports = module.exports = {});

Admin.updatedOfflineTransaction = async ({ admin, transaction }) => {
  const { firstname, lastname, email } = admin;
  const { reference, status, admin_message, total_table } = transaction;
  admin = JSON.stringify({ firstname, lastname, email });
  const user = await transaction.user().fetch();
  transaction = JSON.stringify({ reference, status, admin_message });
  Logger.transport("file").info(
    `Admin ${admin}: updated offline transaction as follows: ${transaction}`
  );
  if (status == "accepted") {
    const trx = await Database.beginTransaction();
    const eventInfo = await EventInfo.first(trx);
    eventInfo.tables_booked += total_table;
    await eventInfo.save(trx);
    trx.commit();
  }

  const HOST = Env.get("FRONT_END_URL");
  const dashboard_url = `${HOST}/app`;
  JobQueue.queueJob({
    jobKey: OfflinePaymentUpdateJob.key,
    data: { user, reference, status, admin_message, dashboard_url },
    options: { attempts: 2 }
  });
};
