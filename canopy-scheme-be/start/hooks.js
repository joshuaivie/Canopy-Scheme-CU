const { ioc } = require("@adonisjs/fold");
const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersRegistered(() => {
  const { sanitizor } = ioc.use("Validator");

  sanitizor.decodeUriAndDecrypt = val => {
    const Encryption = ioc.use("Encryption");
    return Encryption.decrypt(decodeURIComponent(val));
  };

  sanitizor.lowercase = val => {
    return val.toLowerCase();
  };
  const Validator = use("Adonis/Addons/Validator");
  const Database = use("Database");

  Validator.extend(
    "validMatricNo",
    async (data, field, message, args, get) => {
      const value = get(data, field).toLowerCase();
      const row = await Database.table("student_infos")
        .where("matric_no", value)
        .first();
      if (!row) {
        throw message;
      }

      // having trouble with making this process synchronous
      // const fs = require("fs");
      // const path = require("path");
      // fs.readFile(
      //   path.resolve(__dirname, "matricNumbers.json"),
      //   "UTF-8",
      //   (err, data) => {
      //     if (err) throw err;
      //     data = JSON.parse(data);
      //     if (!data.includes(value)) {
      //       throw message;
      //     }
      //   }
      // );
    },
    "This matric number is not valid for this platform"
  );
});
