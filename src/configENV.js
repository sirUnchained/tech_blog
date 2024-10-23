require("dotenv").config();

const configs = {
  db: {
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
  redisURL: process.env.REDIS_URI,
  port: process.env.PORT,
  baseURL: process.env.BASE_URL,

  token: {
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME_PER_DAY,
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME_PER_DAY,
  },
  google: {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  bucket: {
    endPoint: process.env.BUCKET_ENDPOINT,
    name: process.env.BUCKET_NAME,
    accessKey: process.env.BUCKET_ACCESS_KEY,
    secretKey: process.env.BUCKET_SECRET_KEY,
    bucketFullURL: process.env.BUCKET_FULL_URL,
  },
};

module.exports = configs;
