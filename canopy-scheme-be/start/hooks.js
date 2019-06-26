const fs = require("fs");
const { ioc } = require("@adonisjs/fold");
const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersRegistered(() => {
  const Validator = use("Adonis/Addons/Validator");
  const Helpers = use("Helpers");
  const Encryption = ioc.use("Encryption");
  const { sanitizor } = ioc.use("Validator");

  // Sanitizers
  sanitizor.decodeUriAndDecrypt = val =>
    Encryption.decrypt(decodeURIComponent(val));
  sanitizor.lowercase = val => val.toLowerCase();

  // Validators
  Validator.extend(
    "validMatricNo",
    async (data, field, message, args, get) => {
      let content = JSON.parse(
        fs.readFileSync(
          `${Helpers.appRoot()}/storage/matricNumbers.json`,
          "utf8"
        )
      );
      if (
        !content.includes(
          get(data, field)
            .toLowerCase()
            .trim()
        )
      )
        throw message;
    },
    "This matric number is not valid for this platform"
  );
});
