"use strict";
const path = require("path");

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/validator/providers/ValidatorProvider",
  "@adonisjs/framework/providers/ViewProvider",
  "@adonisjs/mail/providers/MailProvider",
  "adonis-sentry/providers/Sentry",
  "adonis-kue/providers/KueProvider",
  "@adonisjs/redis/providers/RedisProvider",
  "adonis-4-cloudinary/provider/Cloudinary",
  path.join(__dirname, "..", "providers", "PaystackProvider"),
  path.join(__dirname, "..", "providers", "MysqlLoggerProvider")
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "adonis-kue/providers/CommandsProvider"
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Paystack: "Paystack/Paystack",
  Cloudinary: "Adonis/Addons/AdonisCloudinary"
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
|
| Here you write jobs
|
*/
const jobs = [
  "App/Jobs/SignupEmail",
  "App/Jobs/GroupInvite",
  "App/Jobs/PasswordResetEmail",
  "App/Jobs/OfflinePaymentUpdate"
];

module.exports = { providers, aceProviders, aliases, commands, jobs };
