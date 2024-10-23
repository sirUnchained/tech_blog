const { commentModel, usersModel, articleModel } = require("../../db");

exports.getPaginated = async (req, res, next) => {
  try {
    let { page } = req.params;
    page = Number(page);
    const articleID = req.body.articleID;

    const comments = await commentModel.findAndCountAll({
      where: {
        article_id: articleID,
      },
      include: [
        { model: usersModel, attributes: ["username", "role", "profile"] },
      ],
      limit: 5,
      offset: (page - 1) * 5,
      order: [["id", "DESC"]],
    });

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { content, score, creator, article } = req.body;
    const checkArticle = await articleModel.findByPk(article, {
      raw: true,
    });
    if (!checkArticle) {
      const msgObj = {
        text: "article not found.",
        title: "not found",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/");
    }

    const checkCreator = await usersModel.findByPk(creator, {
      raw: true,
    });
    if (!checkCreator) {
      const msgObj = {
        text: "login to create comment.",
        title: "unAuthorized",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/auth");
    }

    await commentModel.create({
      content,
      score,
      creator_id: creator,
      article_id: article,
    });

    const msgObj = {
      text: "comment created.",
      title: "created",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect(`/article/single/${checkArticle.title}`);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // todo
  } catch (error) {
    next(error);
  }
};
