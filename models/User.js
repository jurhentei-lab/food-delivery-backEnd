const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "delivery"],
      default: "customer",
    },
    // orderedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // ttl: { type: Date },
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
