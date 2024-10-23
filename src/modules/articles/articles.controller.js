const {
  articleModel,
  categoriesModel,
  tags_articles,
  tagsModel,
  usersModel,
  joinsModel,
} = require("./../../db");
const { Sequelize } = require("sequelize");
const checkUser = require("./../../utils/checkUser");
const sendEmail = require("../../utils/sendEmail");
const configs = require("../../configENV");

exports.showCreateArticle = async (req, res, next) => {
  try {
    const info = req.flash("info");
    return res.render("create-article.ejs", { info });
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    let { page } = req.params;
    page = Number(page);
    const authorID = req.body.authorID;

    let articles = null;
    if (authorID) {
      articles = await articleModel.findAndCountAll({
        where: {
          isPublished: true,
          author_id: authorID,
        },
        attributes: [
          "id",
          "title",
          "cover",
          "createdAt",
          "slug",
          [Sequelize.fn("LEFT", Sequelize.col("content"), 300), "description"],
        ],
        include: [
          { model: usersModel, as: "author", attributes: ["id", "username"] },
          {
            model: categoriesModel,
            as: "category",
            attributes: ["name", "id"],
          },
        ],
        order: [["id", "DESC"]],
        limit: 5,
        offset: (page - 1) * 5 || 0,
        raw: true,
      });
    } else {
      articles = await articleModel.findAndCountAll({
        include: [
          { model: usersModel, as: "author", attributes: ["id", "username"] },
          {
            model: categoriesModel,
            as: "category",
            attributes: ["name", "id"],
          },
        ],
        attributes: [
          "id",
          "title",
          "cover",
          "createdAt",
          "slug",
          [Sequelize.fn("LEFT", Sequelize.col("content"), 300), "description"],
        ],
        where: {
          isPublished: true,
        },
        order: [["id", "DESC"]],
        limit: 5,
        offset: (page - 1) * 5 || 0,
        raw: true,
      });
    }

    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

exports.showArticle = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // ! we are getting many tags for an article so we must NOT using "raw: true"
    const article = await articleModel.findOne({
      where: {
        isPublished: true,
        slug,
      },
      include: [
        {
          model: usersModel,
          as: "author",
          attributes: ["id", "username", "bio", "profile"],
        },
        {
          model: categoriesModel,
          as: "category",
          attributes: ["name", "id"],
        },
        {
          model: tagsModel,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!article) {
      const mgsObj = {
        text: "article not found.",
        icon: "error",
        title: "not found",
      };
      req.flash("info", mgsObj);
      return res.redirect("/");
    }

    const recomended = await articleModel.findAll({
      limit: 2,
      raw: true,
      where: {
        category_id: article.category.dataValues.id,
      },
      attributes: ["title", "slug", "createdAt", "cover"],
      order: [["id", "DESC"]],
    });

    const visitor = await checkUser(req.cookies["accessToken"]);

    const tags = article.tags.map((tag) => {
      return tag.dataValues.name;
    });

    const currentUser = await checkUser(req.cookies["accessToken"]);

    const categories = await categoriesModel.findAll({
      raw: true,
    });

    const info = req.flash("info");
    return res.render("article", {
      info,
      article,
      tags,
      visitor,
      recomended,
      currentUser,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsersArticles = async (req, res, next) => {
  try {
    const { id, page } = req.params;

    const articles = await articleModel.findAndCountAll({
      where: {
        author_id: id,
      },
      order: ["createdAt", "DESC"],
      limit: 5,
      offset: page,
      raw: true,
    });

    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { title, content, isPublished, category } = req.body;
    const cover = req?.file?.path;
    const slug = title?.trim().replace(/\s/g, "_").toLowerCase();
    const author_id = req.user.id;

    const checkExist = await articleModel.findOne({
      where: {
        title,
      },
      raw: true,
    });
    if (checkExist) {
      const msgObj = {
        icon: "error",
        title: "duplicated",
        text: "article title duplicated.",
      };
      req.flash("info", msgObj);
      return res.redirect("/article");
    }

    const existCategory = await categoriesModel.findOne({
      where: {
        id: category,
      },
      raw: true,
    });
    if (!existCategory) {
      const msgObj = {
        icon: "error",
        title: "not found",
        text: "category not found.",
      };
      req.flash("info", msgObj);
      return res.redirect("/article");
    }

    const newArticle = await articleModel.create({
      author_id,
      title,
      content,
      isPublished: isPublished === "publish",
      category_id: category,
      cover,
      slug,
    });

    if (newArticle.isPublished) {
      const newArticleId = newArticle.dataValues.id;
      if (req.body?.tags) {
        let tags = Array.isArray(req.body?.tags)
          ? req.body?.tags
          : [req.body?.tags];
        tags.forEach(async (tag) => {
          await tags_articles.create({
            tag_id: Number(tag),
            article_id: newArticleId,
          });
        });
      }

      const joiners = await joinsModel.findAll({
        attributes: ["email"],
        raw: true,
      });

      let emails = "";
      joiners.forEach((join) => {
        emails += `${join.email} , `;
      });

      const emailOption = {
        to: emails,
        subject: "New Article !",
        text: "you may want to read this new article.",
        html: `
        <h1>${newArticle.title}</h1>
        <hr />
        ${newArticle.content.slice(0, 250)}
        <hr />
        read more on <a href="${configs.baseURL}/article/single/${
          newArticle.slug
        }" >here</a>
        `,
      };
      sendEmail(emailOption);
    }

    const msgObj = {
      icon: "success",
      text: "article created.",
      title: "created",
    };
    req.flash("info", msgObj);
    return res.redirect("/article");
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const checkExist = await articleModel.destroy({
      where: {
        slug,
      },
    });
    if (!checkExist) {
      const msgObj = {
        icon: "error",
        text: "article not found.",
        title: "created",
      };
      req.flash("info", msgObj);
      return res.redirect("/article");
    }

    const msgObj = {
      icon: "success",
      text: "article removed.",
      title: "removed",
    };
    req.flash("info", msgObj);
    return res.redirect("/article");
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { title, content, isPublished, tags, cover } = req.body;
    const slug = title?.trim().replace(/\s/g, "_").toLowerCase();

    const oldArticle = await articleModel.findOne({
      where: {
        title,
      },
      raw: true,
    });
    if (!oldArticle) {
      const msgObj = {
        icon: "error",
        text: "article not found.",
        title: "not found",
      };
      req.flash("info", msgObj);
      return res.redirect("/article");
    }

    oldArticle.title = title;
    oldArticle.content = content;
    oldArticle.isPublished = isPublished === "publish";
    oldArticle.cover = cover;
    oldArticle.slug = slug;

    await oldArticle.save();

    if (newArticle.isPublished) {
      const articleId = oldArticle.id;
      if (req.body?.tags) {
        let tags = Array.isArray(req.body?.tags)
          ? req.body?.tags
          : [req.body?.tags];
        tags.forEach(async (tag) => {
          await tags_articles.create({
            tag_id: Number(tag),
            article_id: articleId,
          });
        });
      }

      const joiners = await joinsModel.findAll({
        attributes: ["email"],
        raw: true,
      });

      let emails = "";
      joiners.forEach((join) => {
        emails += `${join.email} , `;
      });

      const emailOption = {
        to: emails,
        subject: "New Article !",
        text: "you may want to read this new article.",
        html: `
        <h1>${oldArticle.title}</h1>
        <hr />
        ${oldArticle.content.slice(0, 250)}
        <hr />
        read more on <a href="${configs.baseURL}/article/single/${
          oldArticle.slug
        }" >here</a>
        `,
      };
      sendEmail(emailOption);
    }

    const msgObj = {
      icon: "success",
      text: "article updated.",
      title: "updated",
    };
    req.flash("info", msgObj);
    return res.redirect("/article");
  } catch (error) {
    next(error);
  }
};
