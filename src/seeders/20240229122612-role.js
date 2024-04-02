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
      "roles",
      [
        {
          id: 1,
          name: "admin",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        { id: 2,
          name: "staff",
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08", },
          { id: 3,
            name: "customer",
            createdAt:"2024-03-08",
            updatedAt:"2024-03-08", },
      ],    
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
