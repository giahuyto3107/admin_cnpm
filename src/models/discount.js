"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill }) {
      // define association here
      this.hasOne(Bill, { foreignKey: "discount_code" });
    }
  }
  Discount.init(
    {
      discount_value: DataTypes.INTEGER,
      type: DataTypes.ENUM("PR", "AR"), //PR giảm theo phần trăm, AR giảm theo số tiền
      begin_date: DataTypes.DATE,
      finish_date: DataTypes.DATE,
      discount_code: {
        type: DataTypes.STRING,
        primaryKey: true, // Xác định cột discount_code làm khóa chính
      },
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
