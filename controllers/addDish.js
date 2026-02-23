const Food = require("../models/food");

module.exports = async (req, res) => {
  const payload = {
    name: req.body.name?.trim(),
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

  try {
    const created = await Food.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error("Add dish error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
