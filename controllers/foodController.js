const Food = require("../models/food");

exports.addFood = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description || "",
      image: req.body.image || "",
      category: req.body.categoryId || req.body.category,
    };

    if (!payload.name || Number.isNaN(payload.price) || !payload.category) {
      return res
        .status(400)
        .json({ message: "name, price, categoryId шаардлагатай" });
    }

    const food = await Food.create(payload);
    return res.status(201).json(food);
  } catch (err) {
    console.error("Add food error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const query = {};
    if (req.query.categoryId) {
      query.category = req.query.categoryId;
    }
    const foods = await Food.find(query).sort({ createdAt: -1 });
    return res.json(foods);
  } catch (err) {
    console.error("Get foods error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.price !== undefined) {
      updates.price = Number(updates.price);
    }
    if (updates.categoryId) {
      updates.category = updates.categoryId;
      delete updates.categoryId;
    }

    const updated = await Food.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.json(updated);
  } catch (err) {
    console.error("Update food error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.json({ message: "Food deleted" });
  } catch (err) {
    console.error("Delete food error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
