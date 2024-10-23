const passport = require("passport");
const express = require("express");
const router = express.Router();

const controller = require("./auth.controller");
const validator = require("./../../middleWares/validator");

const { loginValidation, registerValidation } = require("./auth.validator");
const validateCaptcha = require("../../middleWares/validateCaptcha");

router.route("/").get(controller.showAuthView);

router
  .route("/register")
  .post(validateCaptcha, validator(registerValidation), controller.register);

router
  .route("/login")
  .post(validateCaptcha, validator(loginValidation), controller.login);

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/google/callback")
  .get(passport.authenticate("google", { session: false }), controller.login);

module.exports = router;
