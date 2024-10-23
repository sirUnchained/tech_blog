const jwt = require("jsonwebtoken");
const { usersModel } = require("../db");
const configs = require("../configENV");

async function authRole(req, res, next) {
  try {
    const accessToken = req.cookies["accessToken"];

    const userTokenResult = jwt.verify(
      accessToken,
      configs.token.accessTokenSecretKey
    );

    const user = await usersModel.findOne({
      where: {
        email: userTokenResult.email,
      },
      raw: true,
    });

    req.user = user;
    next();
  } catch (error) {
    const msgObj = {
      title: "unAuthorized",
      text: "please sign in or sign up first.",
      icon: "warning",
    };
    req.flash("info", msgObj);
    return res.redirect("/auth");
  }
}

module.exports = authRole;
