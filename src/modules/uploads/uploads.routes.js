const express = require("express");
const router = express.Router();

const controller = require("./uploads.controller");
const auth = require("./../../middleWares/auth");
const checkAdmin = require("./../../middleWares/checkAdmin");
const { upload } = require("../../middleWares/uploader");



router.route("/").get(auth, controller.showUploadView);

router.route("/new").post(auth, upload.single("post"), controller.new);

router.route("/remove/:id").post(auth, checkAdmin, controller.remove);

module.exports = router;
