"use strict";

/*
|--------------------------------------------------------------------------
| StudentInfoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const fs = require("fs");
const Helpers = use("Helpers");
const StudentInfo = use("App/Models/StudentInfo");

class StudentInfoSeeder {
  async run() {
    const data = JSON.parse(
      fs.readFileSync(`${Helpers.appRoot()}/storage/studentInfo.json`, "utf8")
    );
    await StudentInfo.createMany(data);
  }
}

module.exports = StudentInfoSeeder;
