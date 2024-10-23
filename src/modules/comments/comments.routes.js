const express = require("express");
const router = express.Router();

const controller = require("./comments.controller");
const auth = require("./../../middleWares/auth");
const checkAdmin = require("./../../middleWares/checkAdmin");

const validator = require("./../../middleWares/validator");
const { validateComment } = require("./comments.validator");

router.route("/all/:page").post(controller.getPaginated);

router.route("/new").post(auth, validator(validateComment), controller.create);

router.route("/remove/:id").post(auth, checkAdmin, controller.remove);

// router.route("/remove/:id").post(auth, controller.create);

module.exports = router;
