const { db } = require("./db");
const redis = require("./utils/redis");
const app = require("./app");
const configs = require("./configENV");

async function connect() {
  try {
    await db.authenticate();

    app.listen(configs.port, () => {
      console.log(`app listen on port ${configs.port}`);
    });
  } catch (error) {
    await db.close();
    await redis.disconnect();
    throw error;
  }
}
connect();
