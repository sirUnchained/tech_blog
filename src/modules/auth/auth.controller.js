const { usersModel } = require("./../../db");
const configs = require("./../../configENV");

const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const generateCaptcha = require("../../utils/generateCaptcha");

exports.showAuthView = async (req, res, next) => {
  try {
    const captcha = await generateCaptcha();

    const info = req.flash("info");

    return res.render("auth.ejs", { info, captcha });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstname, lastname, username, phone, email, password } = req.body;

    const checkUserDup = await usersModel.findOne({
      where: {
        [Op.or]: [{ email }, { username }, { phone }],
      },
      raw: true,
    });
    if (checkUserDup) {
      const msgObj = {
        icon: "error",
        title: "duplicated",
        text: "current username, phone or email is in use.",
      };

      req.flash("info", msgObj);
      return res.redirect("/auth");
    }

    const newUser = usersModel.build({
      firstname,
      lastname,
      username,
      phone,
      email,
      password,
    });
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();

    const accessToken = jwt.sign(
      { email },
      configs.token.accessTokenSecretKey,
      { expiresIn: configs.token.accessTokenExpireTime }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const refreshToken = uuid();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const msgObj = {
      icon: "success",
      title: "welcom",
      text: `welcom to our blog ${firstname} ${lastname}.`,
    };
    req.flash("info", msgObj);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let loggedUser = null;
    const provider = req.user?.provider;
    if (provider === "google") {
      const { email } = req.user;
      const user = await usersModel.findOne({
        where: {
          email,
        },
        raw: true,
      });
      if (!user) {
        const msgObj = {
          icon: "error",
          title: "unathorize",
          text: "invalid email or username.",
        };

        req.flash("info", msgObj);
        return res.redirect("/auth");
      }
      loggedUser = user;
    } else {
      const { body, password } = req.body;

      const user = await usersModel.findOne({
        where: {
          [Op.or]: [{ username: body }, { email: body }],
        },
        raw: true,
      });
      if (!user) {
        const msgObj = {
          icon: "error",
          title: "unathorize",
          text: "invalid email or username.",
        };

        req.flash("info", msgObj);
        return res.redirect("/auth");
      }

      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        const msgObj = {
          icon: "error",
          title: "unathorize",
          text: "invalid email or username or password.",
        };

        req.flash("info", msgObj);
        return res.redirect("/auth");
      }

      loggedUser = user;
    }

    const accessToken = jwt.sign(
      { email: loggedUser.email },
      configs.token.accessTokenSecretKey,
      { expiresIn: configs.token.accessTokenExpireTime }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const refreshToken = uuid();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const msgObj = {
      icon: "success",
      title: "welcom",
      text: `welcom back ${loggedUser.firstname} ${loggedUser.lastname}.`,
    };
    req.flash("info", msgObj);
    return res.redirect("/");
  } catch (error) {
    next(error);
  }
};
