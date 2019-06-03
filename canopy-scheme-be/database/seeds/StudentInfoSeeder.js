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
    await fs.readFile(
      path.resolve(__dirname, "studentInfo.json"),
      "UTF-8",
      (err, data) => {
        if (err) {
          console.log(err);
          throw err;
        }
        data = JSON.parse(data);
        StudentInfo.createMany(data);
      }
    );
  }
}

module.exports = StudentInfoSeeder;
