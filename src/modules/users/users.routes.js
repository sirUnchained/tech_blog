const express = require("express");
const router = express.Router();

const controller = require("./users.controller");
const auth = require("./../../middleWares/auth");
const checkAdmin = require("./../../middleWares/checkAdmin");

const { registerValidation } = require("./../auth/auth.validator");
const validator = require("./../../middleWares/validator");

const { upload } = require("../../middleWares/uploader");

router.route("/profile/:username").get(controller.showProfile);

router
  .route("/update/:username")
  .get(auth, controller.showUpdateView)
  .post(
    auth,
    upload.single("profile"),
    validator(registerValidation),
    controller.update
  );

router.route("/ban/:username").post(auth, checkAdmin, controller.ban);

module.exports = router;
