const { uploadModel } = require("../../db");

exports.showUploadView = async (req, res, next) => {
  try {
    // todo
  } catch (error) {
    next(error);
  }
};

exports.new = async (req, res, next) => {
  try {
    await uploadModel.create({
      path: req.file.path,
      uploaded_user: req.user.id,
    });

    const msgObj = {
      title: "uploaded",
      text: `file => ${req.file.path}`,
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect("/upload");
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
