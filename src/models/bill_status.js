"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill }) {
      // define association here
      this.hasMany(Bill, { foreignKey: "bill_status_id" });
    }
  }
  Bill_Status.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bill_Status",
    }
  );
  return Bill_Status;
};
