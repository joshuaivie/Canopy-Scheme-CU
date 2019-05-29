const { ServiceProvider } = require("@adonisjs/fold");
const Paystack = require("paystack-api");

class PaystackProvider extends ServiceProvider {
  register() {
    this.app.singleton("Paystack/Paystack", () => {
      const Config = this.app.use("Adonis/Src/Config");

      return new Paystack(Config.get("paystack.secretKey"));
    });
  }
}

module.exports = PaystackProvider;
