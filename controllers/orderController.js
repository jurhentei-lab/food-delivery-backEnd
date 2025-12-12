const Order = require("../model/Order");
const Food = require("../model/Food");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  const { user, items, totalPrice } = req.body;

  try {
    const order = new Order({
      user,
      items,
      totalPrice,
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("CreateOrder error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
