const { DataTypes } = require("sequelize");

const articleModel = (sequelize) => {
  const model = sequelize.define(
    "article",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "articles",
      timestamps: true,
    }
  );
  return model;
};

module.exports = articleModel;
