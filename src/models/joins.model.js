const { DataTypes } = require("sequelize");

const joinsModel = (sequelize) => {
  const model = sequelize.define(
    "join",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
      tableName: "joins",
    }
  );
  return model;
};

module.exports = joinsModel;
