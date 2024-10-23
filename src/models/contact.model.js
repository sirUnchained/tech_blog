const { DataTypes } = require("sequelize");

const contactModel = (sequelize) => {
  const model = sequelize.define(
    "contacts",
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
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      isAnswer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "contacts",
      timestamps: false,
    }
  );

  return model;
};

module.exports = contactModel;
