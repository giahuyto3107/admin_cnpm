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
      "bill_statuses",
      [
        {
          id: 1,
          status: "Chờ duyệt",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          id: 2,
          status: "Đã duyệt",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          id: 3,
          status: "Đã huỷ",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
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
    await queryInterface.bulkDelete("bill_statuses", null, {});
  },
};
