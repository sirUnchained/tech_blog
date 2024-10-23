const { DataTypes } = require("sequelize");

const tagsModel = (sequelize) => {
  const model = sequelize.define(
    "tags",
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
      tableName: "tags",
      timestamps: true,
    }
  );
  return model;
};

module.exports = tagsModel;
