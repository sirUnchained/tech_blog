"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tags_articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      tag_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "tags",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      article_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "articles",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addConstraint("tags_articles", {
      fields: ["tag_id", "article_id"],
      type: "unique",
      name: "unique_tag_article_id",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tags_articles");
  },
};
