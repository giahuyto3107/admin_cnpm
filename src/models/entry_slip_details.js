"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class entry_slip_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Model) {
      // define association here
    }
  }
  entry_slip_details.init(
    {
      quantity: DataTypes.INTEGER,
      entry_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "entry_slip_details",
    }
  );
  return entry_slip_details;
};
