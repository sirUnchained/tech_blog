const { usersModel, categoriesModel } = require("./../../db");
const bcrypt = require("bcryptjs");

const ckeckUser = require("./../../utils/checkUser");

exports.showProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await usersModel.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      const msgObj = {
        text: "user not found",
        title: "not found",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect("/");
    }

    const currentUser = await ckeckUser(req.cookies["accessToken"]);
    const isOwn = currentUser?.username === user?.username;

    const categories = await categoriesModel.findAll({
      raw: true,
    });

    const info = req.flash("info");
    return res.render("profile.ejs", {
      user,
      info,
      isOwn,
      categories,
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.showUpdateView = async (req, res, next) => {
  try {
    const { username } = req.params;
    const visitor = req.user;

    if (username !== visitor.username) {
      const msgObj = {
        title: "access denied",
        text: "you can't update other users profile.",
        icon: "warning",
      };
      req.flash("info", msgObj);
      return res.redirect("/");
    }

    const info = req.flash("info");
    return res.render("update-profile.ejs", { info, visitor });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { firstname, lastname, username, phone, email, password, bio } =
      req.body;
    const { username: oldUsername } = req.params;
    const visitor = req.user;

    if (visitor.username !== oldUsername) {
      const msgObj = {
        title: "access denied",
        text: "you cant update other users profile.",
        icon: "warning",
      };
      req.flash("info", msgObj);
      return res.redirect(`/user/profile/${oldUsername}`);
    }

    const newUser = await usersModel.findOne({
      where: {
        username: oldUsername,
      },
    });
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.username = username;
    newUser.phone = phone;
    newUser.email = email;
    newUser.bio = bio || null;
    newUser.profile = req.file.path || null;
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    const msgObj = {
      title: "updated",
      text: "your profile updated.",
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect(`/user/profile/${username}`);
  } catch (error) {
    next(error);
  }
};

exports.ban = async (req, res, next) => {
  try {
    const { username } = req.params;
    const removedUser = await usersModel.destroy({
      where: {
        username,
      },
    });
    if (!removedUser) {
      const msgObj = {
        title: "not found",
        text: "user not found.",
        icon: "error",
      };
      req.flash("info", msgObj);
      return res.redirect(`/user/profile/${username}`);
    }

    const msgObj = {
      title: "banned",
      text: `user ${removedUser.username} banned.`,
      icon: "success",
    };
    req.flash("info", msgObj);
    return res.redirect(`/user/profile/${username}`);
  } catch (error) {
    next(error);
  }
};

exports.report = async (req, ers, next) => {
  try {
    // todo
  } catch (error) {
    next(error);
  }
};
