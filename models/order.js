const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
        quantity: Number
      }
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Preparing", "Out for delivery", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
