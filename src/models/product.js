"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Author, Bill, entry_slip, Publisher,cart }) {
      // define association here
      this.belongsToMany(Category, {
        through: "product_category",
        foreignKey: "product_id",
      });
      this.belongsToMany(Author, {
        through: "product_author",
        foreignKey: "product_id",
      });
      this.belongsToMany(Bill, {
        through: "bill_detail",
        foreignKey: "product_id",
      });
      this.belongsToMany(entry_slip, {
        through: "entry_slip_details",
        foreignKey: "product_id",
      });
      this.belongsTo(Publisher, { foreignKey: "publisher_id" });
      this.belongsToMany(cart,{
        through:"cart_products",
        foreignKey:"product_id",
      })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT("long"),
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      publish_year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
