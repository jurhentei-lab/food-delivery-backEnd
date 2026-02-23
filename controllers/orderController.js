const Order = require("../models/order");
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      address,
      phone,
      latitude,
      longitude,
      mapUrl,
      items,
      total,
      notes,
    } = req.body;

    if (!customerName || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "customerName, address, items шаардлагатай" });
    }

    const normalizedItems = items.map((item) => ({
      dishId: item.dishId,
      dishName: item.dishName,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const calculatedTotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const safeTotal = Number(total);
    const finalTotal = Number.isFinite(safeTotal) && safeTotal > 0 ? safeTotal : calculatedTotal;

    const safeUserId =
      userId && mongoose.Types.ObjectId.isValid(userId) ? userId : undefined;

    const order = await Order.create({
      userId: safeUserId,
      customerName,
      address,
      phone: phone || "",
      latitude: Number.isFinite(Number(latitude)) ? Number(latitude) : null,
      longitude: Number.isFinite(Number(longitude)) ? Number(longitude) : null,
      mapUrl: mapUrl || "",
      notes: notes || "",
      items: normalizedItems,
      total: finalTotal,
      status: "pending",
    });

    return res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (_req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = [
      "pending",
      "preparing",
      "delivering",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Delete order error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
