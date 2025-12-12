const mongoose = require("mongoose");

// 1) Schema тодорхойлно
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 2) Model үүсгэнэ
module.exports = mongoose.model("Product", productSchema);
