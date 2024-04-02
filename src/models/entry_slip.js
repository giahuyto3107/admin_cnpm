"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class entry_slip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Suppliers, Product, User }) {
      this.belongsTo(Suppliers, {
        foreignKey: "suppliers_id",
      });
      this.belongsToMany(Product, {
        through: "entry_slip_details",
        foreignKey: "entry_slip_id",
      });
      this.belongsTo(User, {
        foreignKey: "staff_id",
      });
    }
  }
  entry_slip.init(
    {
      date_entry: DataTypes.DATE,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "entry_slip",
    }
  );
  return entry_slip;
};
