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
      "users",
      [
        {
          email: "nguyenthengoc123@gmail.com",
          password: "$2a$10$MlkziZ41nwJSzNdFlRIJH.kFiPTt.B/RpbvXenypg7RhZvt8RHLi6",
          role_id: 1,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          email: "admin123@gmail.com",
          password: "$2a$10$ovquuBW97DWNDV6aLgZOpu1RbiRYFE/Pg/JCljUPcs8eK61HLFsPO",
          role_id: 1,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          email: "staff123@gmail.com",
          password: "$2a$10$ZIu2ihaA4CkMgl.N3dVrUeZ4AamwYV2ZtYNvbavHkPYr5DVU9Ord.",
          role_id: 2,
          createdAt:"2024-03-08",
          updatedAt:"2024-03-08",
        },
        {
          email: "customer123@gmail.com",
          password: "$2a$10$f3/24RDLra9o9ZZuL6ICqeJVEbMRXfsOlp/AKciDkaHVJgJ4Nccwe",
          role_id: 3,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
