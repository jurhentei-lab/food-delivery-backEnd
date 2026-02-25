const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const normalizeEnvValue = (rawValue) => {
  const value = String(rawValue ?? "").trim();
  const quoted =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"));

  if (quoted) {
    return value.slice(1, -1);
  }

  return value;
};

const loadEnvFromFile = () => {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = normalizeEnvValue(line.slice(equalIndex + 1));

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
module.exports.loadEnvFromFile = loadEnvFromFile;
