const { joinsModel } = require("../../db");

exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmailExist = await joinsModel.findOne({
      where: {
        email,
      },
    });
    if (checkEmailExist) {
      const msgObj = {
        text: "email already exist.",
        title: "duplicated",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/");
    }

    await joinsModel.create({ email });
    const msgObj = {
      text: "you are now joined.",
      title: "done",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};
