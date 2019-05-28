const { ioc } = require('@adonisjs/fold');
const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersRegistered(() => {
  const { sanitizor } = ioc.use('Validator');

  sanitizor.uri_decode_component = val => {
    return decodeURIComponent(val);
  };
});
