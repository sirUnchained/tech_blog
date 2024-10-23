const express = require("express");
const router = express.Router();

const controller = require("./tags.controller");
const auth = require("./../../middleWares/auth");
const checkAdmin = require("./../../middleWares/checkAdmin");

router.route("/").get(auth, controller.showTagView);
router.route("/all").get(auth, controller.getAll);
router.route("/create").post(auth, controller.create);
router.route("/remove/:id").post(auth, checkAdmin, controller.remove);

module.exports = router;
