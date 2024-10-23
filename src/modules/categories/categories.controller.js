const { Sequelize } = require("sequelize");
const { categoriesModel, articleModel, usersModel } = require("./../../db");
const checkUser = require("../../utils/checkUser");

exports.showCategoryView = async (req, res, next) => {
  try {
    const { categoryID } = req.params;

    const articles = await articleModel.findAll({
      where: {
        category_id: categoryID,
      },
      attributes: [
        "title",
        "cover",
        "slug",
        "createdAt",
        [Sequelize.fn("LEFT", Sequelize.col("content"), 300), "description"],
      ],
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
      ],
      raw: true,
    });

    const currentUser = await checkUser(req.cookies["accessToken"]);

    const categories = await categoriesModel.findAll({
      raw: true,
    });

    const info = req.flash("info");
    return res.render("category.ejs", {
      info,
      articles,
      categories,
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const categories = await categoriesModel.findAll({
      // include: [articleModel],
      raw: true,
    });
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name = name?.trim() } = req.body;
    const creator_id = req.user.id;
    if (name.length > 50) {
      const msgObj = {
        title: "too larg",
        text: "category length must be below 50 cahracter.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/category");
    }

    const checkISExist = await categoriesModel.findOne({
      where: {
        name,
      },
      raw: true,
    });
    if (checkISExist) {
      const msgObj = {
        title: "duplicated",
        text: "category name already exist.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/category");
    }

    await categoriesModel.create({ name, creator_id });

    const msgObj = {
      title: "created",
      text: "category created.",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/category");
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoriesModel.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      const msgObj = {
        title: "not found",
        text: "category not found.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/category");
    }

    const msgObj = {
      title: "removed",
      text: "category removed.",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/category");
  } catch (error) {
    next(error);
  }
};
