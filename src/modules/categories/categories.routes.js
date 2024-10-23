const express = require("express");
const router = express.Router();

const controller = require("./categories.controller");
const auth = require("../../middleWares/auth");
const checkAdmin = require("../../middleWares/checkAdmin");

router.route("/all").get(controller.getAll);
router.route("/create").post(auth, checkAdmin, controller.create);
router.route("/remove/:id").post(auth, checkAdmin, controller.remove);
router.route("/:categoryID").get(controller.showCategoryView);

module.exports = router;
