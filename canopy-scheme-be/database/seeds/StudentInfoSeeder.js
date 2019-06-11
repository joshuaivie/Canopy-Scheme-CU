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

class StudentInfoSeeder {
  async run() {
    const fs = require("fs");
    const path = require("path");
    const StudentInfo = use("App/Models/StudentInfo");
    let content = fs.readFileSync(
      path.resolve(__dirname, "studentInfo.json"),
      "utf8"
    );
    content = JSON.parse(content);
    await StudentInfo.createMany(content);
  }
}

module.exports = StudentInfoSeeder;
