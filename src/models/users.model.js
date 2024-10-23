const { DataTypes } = require("sequelize");

const usersModel = (sequelize) => {
  const model = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      firstname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
      bio: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.ENUM,
        values: ["local", "google"],
        allowNull: false,
        defaultValue: "local",
      },
      role: {
        type: DataTypes.ENUM,
        values: ["user", "admin", "boss"],
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  return model;
};

module.exports = usersModel;
