const captchaGenerator = require("svg-captcha");
const uuid = require("uuid").v4;
const redis = require("./redis");

async function generateCaptcha() {
  const captcha = captchaGenerator.create({
    color: true,
    noise: 3,
  });

  const captchaID = `captchaID:${uuid()}`;
  await redis.set(captchaID, captcha.text.toLowerCase(), "EX", 60 * 3);

  return { captchaID, captchaSVG: captcha.data };
}

module.exports = generateCaptcha;
