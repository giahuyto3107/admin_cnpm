'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entry_slip_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entry_slip_id:{
        type:Sequelize.INTEGER,
        references:{
          model:"entry_slips",
          key:"id",
        }
      },
      product_id:{
        type:Sequelize.INTEGER,
        references:{
          model:"products",
          key:"id",
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      entry_price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('entry_slip_details');
  }
};