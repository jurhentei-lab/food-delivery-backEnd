const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true } // ← энд нэмсэн
);

module.exports = mongoose.model("Category", CategorySchema);
