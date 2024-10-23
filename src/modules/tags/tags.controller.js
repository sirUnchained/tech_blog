const { tagsModel } = require("./../../db");

exports.showTagView = async (req, res, naxt) => {
  try {
    const info = req.flash("info");
    const userID = req.user.id;
    const userTags = await tagsModel.findAll({
      where: {
        creator_id: userID,
      },
      raw: true,
    });
    return res.render("create-tag", { info, userTags });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const tags = await tagsModel.findAll({ raw: true });

    return res.status(200).json(tags);
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
        text: "tag's name length must be below 50 cahracter.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/tag");
    }

    const checkISExist = await tagsModel.findOne({
      where: {
        name,
      },
      raw: true,
    });
    if (checkISExist) {
      const msgObj = {
        title: "duplicated",
        text: "tag name already exist.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/tag");
    }

    await tagsModel.create({ name, creator_id });

    const msgObj = {
      title: "created",
      text: "tag created.",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/tag");
  } catch (error) {
    next(next);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tagsModel.destroy({
      where: {
        id,
      },
    });
    if (!result) {
      const msgObj = {
        title: "not found",
        text: "tag not found.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/tag");
    }

    const msgObj = {
      title: "removed",
      text: "tag removed.",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/tag");
  } catch (error) {
    next(next);
  }
};
