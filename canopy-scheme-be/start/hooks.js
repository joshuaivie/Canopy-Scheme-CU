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
  const fs = require("fs");
  const path = require("path");

  Validator.extend(
    "validMatricNo",
    async (data, field, message, args, get) => {
      const value = get(data, field).toLowerCase();
      let content = fs.readFileSync(
        path.resolve(__dirname, "matricNumbers.json"),
        "utf8"
      );
      content = JSON.parse(content);
      if (!content.includes(value)) {
        throw message;
      }
    },
    "This matric number is not valid for this platform"
  );
});
