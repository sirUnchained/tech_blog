const {
  categoriesModel,
  articleModel,
  usersModel,
  commentModel,
} = require("../../db");
const checkUser = require("../../utils/checkUser");

exports.showHomeView = async (req, res, next) => {
  try {
    const currentUser = await checkUser(req.cookies["accessToken"]);

    const categories = await categoriesModel.findAll({
      raw: true,
    });

    const article = await articleModel.findAll({
      include: [
        { model: categoriesModel, as: "category", attributes: ["name"] },
        { model: usersModel, as: "author", attributes: ["username"] },
      ],
      attributes: ["title", "slug", "title", "cover", "createdAt"],
      order: [["id", "DESC"]],
      limit: 3,
      raw: true,
    });

    const comments = await commentModel.findAll({
      include: [
        {
          model: usersModel,
          attributes: ["username"],
        },
        {
          model: articleModel,
          attributes: ["slug", "title", "cover"],
        },
      ],
      raw: true,
      limit: 3,
      order: [["id", "DESC"]],
    });

    const info = req.flash("info");
    return res.render("index.ejs", { info, currentUser, categories, comments, article });
  } catch (error) {
    next(error);
  }
};
