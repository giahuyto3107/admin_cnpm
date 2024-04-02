"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Discounts", {
      discount_code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      discount_value: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("PR", "AR"), //PR giảm theo phần trăm, AR giảm theo số tiền
      },
      begin_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      finish_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Discounts");
  },
};
