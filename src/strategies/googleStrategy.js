const GoogleStrategy = require("passport-google-oauth20");
const { usersModel } = require("../db");
const configs = require("../configENV");

module.exports = new GoogleStrategy(
  {
    clientID: configs.google.googleClientID,
    clientSecret: configs.google.googleClientSecret,
    callbackURL: `${configs.baseURL}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;

    const user = await usersModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (user) {
      return done(null, user);
    }

    const { familyName: lastname, givenName: firstname } = profile.name;
    const username = `${firstname}-${Math.floor(Math.random() * 100000000)}`
      .toLowerCase()
      .replace(/[\.-\s]/g, "_");

    const profilePic = profile.photos[0].value;

    await usersModel.create({
      email,
      username,
      firstname,
      lastname,
      profile: profilePic ? profilePic : null,
      provider: "google",
    });

    done(null, user);
  }
);
