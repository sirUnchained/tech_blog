const { DataTypes } = require("sequelize");

const commentModel = (sequelize) => {
  const model = sequelize.define(
    "comments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      content: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 5,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "comments",
      timestamps: false,
    }
  );
  return model;
};

module.exports = commentModel;
