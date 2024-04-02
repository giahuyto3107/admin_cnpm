"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "discounts",
      [
        {
          discount_code: "SIEUSALE",
          discount_value: 50000,
          type:"AR",
          begin_date:"2024-05-01",
          finish_date:"2024-12-01",
          createdAt:"2024-05-01",
          updatedAt:"2024-05-01",
        },
        {
          discount_code: "GIAM_NUA_GIA",
          discount_value: 50,
          type:"PR",
          begin_date:"2024-05-01",
          finish_date:"2024-12-01",
          createdAt:"2024-05-01",
          updatedAt:"2024-05-01",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("discounts", null, {});
  },
};
