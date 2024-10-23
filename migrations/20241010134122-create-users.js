"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      firstname: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      lastname: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      provider: {
        type: Sequelize.ENUM,
        values: ["local", "google"],
        allowNull: false,
        defaultValue: "local",
      },
      role: {
        type: Sequelize.ENUM,
        values: ["user", "admin", "boss"],
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
