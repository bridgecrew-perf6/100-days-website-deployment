const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://0.0.0.0:27017"; // used in local development

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
} // overwrites mongodbUrl if a more specific environment variable is present, specifically a mongodb url

let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("deployment");
}

function getDb() {
  if (!database) {
    throw new Error("No database connected!");
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
