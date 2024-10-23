function checkAdmin(req, res, next) {
  try {
    if (req.user?.role != "boss") {
      const msgObj = {
        title: "access denied",
        text: "this route is protected.",
        icon: "warning",
      };
      // console.log(req.get("Referer"));
      // console.log(req.get("Referer") || "/");

      req.flash("info", msgObj);
      return res.redirect("/");
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkAdmin;
