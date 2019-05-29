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
});
