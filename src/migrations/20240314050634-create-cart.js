'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   
      //   type: Sequelize.INTEGER
      // },
      user_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:"users",
          key:"id",
        }
      },
      total_price: {
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
    await queryInterface.dropTable('carts');
  }
};