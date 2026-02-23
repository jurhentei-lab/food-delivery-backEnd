const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const loadEnvFromFile = () => {
  if (process.env.MONGOOSE_URI) return;

  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = line.slice(equalIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

const connectToDB = async () => {
  loadEnvFromFile();

  if (!process.env.MONGOOSE_URI) {
    throw new Error("MONGOOSE_URI not found");
  }

  await mongoose.connect(process.env.MONGOOSE_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  const dbName =
    mongoose.connection?.db?.databaseName ||
    mongoose.connection?.name ||
    "unknown";
  console.log(`Database connection success (db: ${dbName})`);
};

module.exports = connectToDB;
