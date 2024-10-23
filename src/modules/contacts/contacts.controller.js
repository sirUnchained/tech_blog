const { categoriesModel, contactModel } = require("../../db");
const checkUser = require("../../utils/checkUser");

exports.showContactView = async (req, res, next) => {
  try {
    const currentUser = await checkUser(req.cookies["accessToken"]);

    const categories = await categoriesModel.findAll({
      raw: true,
    });

    const info = req.flash("info");
    return res.render("contact.ejs", { info, currentUser, categories });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await contactModel.findAll({
      raw: true,
      order: [["id", "DESC"]],
    });

    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.new = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    await contactModel.create({ name, email, phone, subject, message });

    const msgObj = {
      text: "contact created.",
      title: "created",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/contact");
  } catch (error) {
    next(error);
  }
};

exports.answer = async (req, res, next) => {
  try {
    // todo
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { contactID } = req.params;
    await contactModel.destroy({
      where: {
        id: contactID,
      },
    });

    return res.redierct("/");
  } catch (error) {
    next(error);
  }
};
