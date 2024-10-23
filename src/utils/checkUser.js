const configs = require("../configENV");
const { usersModel } = require("./../db");
const jwt = require("jsonwebtoken");

async function checkUser(cookie) {
  try {
    const cookieDatas = await jwt.verify(
      cookie,
      configs.token.accessTokenSecretKey
    );

    const user = await usersModel.findOne({
      attributes: ["username", "profile", "id"],
      where: {
        email: cookieDatas.email,
      },
      raw: true,
    });

    return user;
  } catch (error) {
    return null;
  }
}

module.exports = checkUser;
