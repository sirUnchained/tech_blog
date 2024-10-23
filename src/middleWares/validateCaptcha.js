const redis = require("./../utils/redis");

async function validateCaptcha(req, res, next) {
  const { captchaID, captchaVal } = req.body;

  const captcha = await redis.get(captchaID);

  if (captchaVal !== captcha) {
    const msgObj = {
      text: "captcha is not valid.",
      title: "failed captcha",
      icon: "warning",
    };
    req.flash("info", msgObj);
    return res.redirect("/auth");
  }

  next();
}

module.exports = validateCaptcha;
