const { Redis } = require("ioredis");
const configs = require("./../configENV");

const redisConnection = new Redis(configs.redisURL);

module.exports = redisConnection;
