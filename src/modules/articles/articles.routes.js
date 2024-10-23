const express = require("express");
const router = express.Router();

const controller = require("./articles.controller");

const auth = require("../../middleWares/auth");
const checkAdmin = require("../../middleWares/checkAdmin");
const { upload } = require("./../../middleWares/uploader");



router.route("/").get(auth, controller.showCreateArticle);
router.route("/all/:page").post(controller.get);
router.route("/single/:slug").get(controller.showArticle);
router.route("/user/:id").get(controller.getUsersArticles);
router.route("/remove/:slug").post(auth, checkAdmin, controller.remove);
router.route("/update/:slug").post(auth, checkAdmin, controller.update);
router.route("/new").post(auth, upload.single("cover"), controller.create);

module.exports = router;
