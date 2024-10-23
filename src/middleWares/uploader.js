const fs = require("node:fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const configs = require("./../configENV");

const s3 = new AWS.S3({
  region: "default",
  endpoint: configs.bucket.endPoint,
  credentials: {
    accessKeyId: configs.bucket.accessKey,
    secretAccessKey: configs.bucket.secretKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: configs.bucket.name,
    key: (req, file, cb) => {
      const username = req.user.username;
      let path = null;

      path = `https://b-sample-work-space.storage.c2.liara.space/tech_blog/uploads/${username}/${Date.now().toString()}_${
        file.originalname
      }`;

      file.path = path;

      cb(
        null,
        `tech_blog/uploads/${username}/${Date.now().toString()}_${
          file.originalname
        }`
      );
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|png|jpeg|webp/;
    if (allowedTypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("file type not allowed."), false);
    }
  },
});

async function resizeImage(req, res, next) {
  const { buffer } = req.file;
  console.log(req.file);

  if (!req.file) {
    return res.send("no file uploaded.");
  }

  await sharp(buffer)
    .resize(800, 800)
    .toBuffer()
    .then((data) => {
      req.file.buffer = data;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { upload, resizeImage };
