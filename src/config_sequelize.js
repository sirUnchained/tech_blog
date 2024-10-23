const configs = require("./configENV");

const config = {
  development: {
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
  test: {
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
  production: {
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.name,
    host: configs.db.host,
    dialect: configs.db.dialect,
  },
};

console.log(config);

module.exports = config;
