"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, cart }) {
      // define association here
      this.belongsTo(Role, { foreignKey: "role_id" });
      this.hasOne(cart, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullname: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      avatar_image: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
