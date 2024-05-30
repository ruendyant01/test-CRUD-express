'use strict';

const data = require("../db/users.json");
const {encPass} = require("../utils/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const finalData = data.map(val => {
      val["createdAt"] = val["updatedAt"] = new Date()
      val.password = encPass(val.password)
      return val;
    })

    await queryInterface.bulkInsert("Users",finalData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users");
  }
};
