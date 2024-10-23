const path = require("node:path");
// create app
const express = require("express");
const app = express();
// require dependencies
const cookie = require("cookie-parser");
const session = require("cookie-session");
const cors = require("cors");
const flash = require("express-flash");
const helmet = require("helmet");
const passport = require("passport");
const configs = require("./configENV");
// set dependencies
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", "data:", configs.bucket.bucketFullURL],
        mediaSrc: ["'self'", configs.bucket.bucketFullURL],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcAttr: ["'self", "https:", "'unsafe-inline'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      },
    },
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookie());
app.use(flash());
app.use(
  session({
    secret: "somthing_vary_unknown_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: configs.baseURL,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST"],
  })
);
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// set passport
const googleStrategy = require("./strategies/googleStrategy");
passport.use(googleStrategy);
// require routes
const homeRoutes = require("./modules/home/home.routes");
const authRoutes = require("./modules/auth/auth.routes");
const categoryRoutes = require("./modules/categories/categories.routes");
const tagsRoutes = require("./modules/tags/tags.routes");
const uploadsRoutes = require("./modules/uploads/uploads.routes");
const articleRoutes = require("./modules/articles/articles.routes");
const usersRoutes = require("./modules/users/users.routes");
const commentsRoutes = require("./modules/comments/comments.routes");
const joinsRoutes = require("./modules/joins/join.routes");
const contactsRoutes = require("./modules/contacts/contacts.routes");
// set routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/tag", tagsRoutes);
app.use("/upload", uploadsRoutes);
app.use("/article", articleRoutes);
app.use("/user", usersRoutes);
app.use("/comment", commentsRoutes);
app.use("/join", joinsRoutes);
app.use("/contact", contactsRoutes);

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).send(err);
});

module.exports = app;
