"use strict";

const Env = use("Env");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: "redis",

  /*
  |--------------------------------------------------------------------------
  | redis connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  redis: {
    port: Env.get("REDIS_PORT", "6379"), // Redis port
    host: Env.get("REDIS_HOST", "127.0.0.1"), // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: Env.get("REDIS_PASSWORD", "auth"),
    db: 0
  },

  /*
  |--------------------------------------------------------------------------
  | kue connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a kue connection.
  |
  */
  kue: {
    port: Env.get("REDIS_PORT", "6379"),
    host: Env.get("REDIS_HOST", "127.0.0.1"),
    password: Env.get("REDIS_PASSWORD", null),
    db: 0,
    keyPrefix: "kue"
  }
};
