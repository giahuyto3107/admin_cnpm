'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Product}) {
      this.belongsTo(User,{
        foreignKey: "user_id",
      })
      this.belongsToMany(Product,{
        through:"cart_products",
        foreignKey:"user_id",
      })
    }
  }
  cart.init({
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};