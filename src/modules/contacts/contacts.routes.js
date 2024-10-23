const express = require("express");
const router = express.Router();

const controller = require("./contacts.controller");
const { contactValidator } = require("./contacts.validator");
const validator = require("./../../middleWares/validator");

const auth = require("./../../middleWares/auth");
const checkAdmin = require("./../../middleWares/checkAdmin");

router.route("/").get(controller.showContactView);

router.route("/new").post(validator(contactValidator), controller.new);

router.route("/all").get(auth, checkAdmin, controller.getContacts);

router.route("/answer/contactID").post(auth, checkAdmin, controller.answer);

router.route("/remove/contactID").post(auth, checkAdmin, controller.remove);

module.exports = router;
