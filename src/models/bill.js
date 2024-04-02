"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User, Discount, Bill_Status, Bill_Detail }) {
      // define association here
      this.belongsToMany(Product, {
        through: "bill_detail",
        foreignKey: "bill_id",
      });
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasOne(Discount, { foreignKey: "discount_code" });
      this.hasOne(Bill_Status, { foreignKey: "bill_status_id" });
    }
  }
  Bill.init(
    {
      date_create: DataTypes.DATE,
      total_price: DataTypes.DOUBLE,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      bill_status_id: DataTypes.INTEGER,
      payment_method: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
