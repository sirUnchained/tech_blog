const express = require("express");
const router = express.Router();

const controller = require("./join.controller");
const { joinValidator } = require("./join.validator");
const validator = require("./../../middleWares/validator");

router.route("/").post(validator(joinValidator), controller.create);

module.exports = router;
