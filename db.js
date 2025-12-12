const mongoose = require("mongoose");

let isConnected = false; // Холболт үүссэн эсэхийг хадгалах

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://99246065Tj:99246065Tj@cluster0.179dq7j.mongodb.net/"
    );

    console.log("Database connection success");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

module.exports = connectToDB;
