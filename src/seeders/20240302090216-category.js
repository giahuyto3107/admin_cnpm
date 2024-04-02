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
      "categories",
      [
        {
          id: 1,
          name: "Khoa học",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          id: 2,
          name: "Light novel",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          id: 3,
          name: "Tâm lý học",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
