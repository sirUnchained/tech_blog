const { DataTypes } = require("sequelize");

const tags_articles = (sequelize) => {
  const model = sequelize.define(
    "tags_articles",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      tableName: "tags_articles",
      timestamps: false,
    }
  );
  return model;
};

module.exports = tags_articles;
