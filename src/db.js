const { Sequelize } = require("sequelize");
const configs = require("./configENV.js");

const db = new Sequelize({
  username: configs.db.username,
  password: configs.db.password,
  database: configs.db.name,
  host: configs.db.host,
  dialect: configs.db.dialect,
  logging: console.log("database start !"),
});

const usersModel = require("./models/users.model")(db);
const categoriesModel = require("./models/categories.model.js")(db);
const articleModel = require("./models/articles.model.js")(db);
const tagsModel = require("./models/tags.model.js")(db);
const uploadModel = require("./models/upload.model.js")(db);
const tags_articles = require("./models/tags_articles.model.js")(db);
const commentModel = require("./models/comments.model.js")(db);
const joinsModel = require("./models/joins.model.js")(db);
const contactModel = require("./models/contact.model.js")(db);

usersModel.hasMany(categoriesModel, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
});
categoriesModel.belongsTo(usersModel, {
  foreignKey: "creator_id",
  as: "creator",
});

usersModel.hasMany(articleModel, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});
articleModel.belongsTo(usersModel, {
  foreignKey: "author_id",
  as: "author",
});

usersModel.hasMany(tagsModel, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
});
tagsModel.belongsTo(usersModel, {
  foreignKey: "creator_id",
  as: "creator",
});

usersModel.hasMany(uploadModel, {
  foreignKey: "uploaded_user",
  onDelete: "CASCADE",
});
uploadModel.belongsTo(usersModel, {
  foreignKey: "uploaded_user",
  as: "by",
});

categoriesModel.hasMany(articleModel, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
articleModel.belongsTo(categoriesModel, {
  foreignKey: "category_id",
  as: "category",
});

articleModel.hasMany(commentModel, {
  foreignKey: "article_id",
  as: "article",
});
commentModel.belongsTo(articleModel, {
  foreignKey: "article_id",
  onDelete: "CASCADE",
});
usersModel.hasMany(commentModel, {
  foreignKey: "creator_id",
  as: "creator",
});
commentModel.belongsTo(usersModel, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
});

articleModel.belongsToMany(tagsModel, {
  through: tags_articles,
  foreignKey: "article_id",
  onDelete: "CASCADE",
});
tagsModel.belongsToMany(articleModel, {
  through: tags_articles,
  foreignKey: "tag_id",
  onDelete: "CASCADE",
});

module.exports = {
  db,
  usersModel,
  articleModel,
  categoriesModel,
  tagsModel,
  tags_articles,
  commentModel,
  joinsModel,
  contactModel,
};
