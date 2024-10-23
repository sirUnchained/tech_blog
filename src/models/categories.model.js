const { DataTypes } = require("sequelize");

const categoriesModel = (sequelize) => {
  const model = sequelize.define(
    "category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );
  return model;
};

module.exports = categoriesModel;
