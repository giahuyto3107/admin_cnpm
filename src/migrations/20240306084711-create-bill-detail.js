"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bill_details", {
      bill_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "bills",
          key: "id",
        },
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bill_details");
  },
};
