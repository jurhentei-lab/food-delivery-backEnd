const mongoose = require("mongoose");

// Role enum
const UserRoleEnum = ["customer", "admin", "delivery"];

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    // phoneNumber: { type: Number, required: true },
    // address: { type: String, required: true },
    // role: { type: String, enum: UserRoleEnum, default: "customer" },
    // orderedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    // ttl: { type: Date },
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
