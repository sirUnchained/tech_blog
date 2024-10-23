const { DataTypes } = require("sequelize");

const uploadModel = (sequelize) => {
  const model = sequelize.define(
    "upload",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "uploads",
    }
  );
  return model;
};

module.exports = uploadModel;
